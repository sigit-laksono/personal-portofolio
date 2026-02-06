const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * <%= pkg.title %> v<%= pkg.version %>\n',
  ' * Copyright 2013-' + (new Date()).getFullYear() + '\n',
  ' * Licensed under <%= pkg.license %>\n',
  ' */\n',
  ''
].join('');

// Compile SCSS files from /scss into /css
function compileSass() {
  return gulp.src('scss/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}

// Minify compiled CSS
function minifyCSS() {
  return gulp.src('css/resume.css')
    .pipe(cleanCSS({ compatibility: 'ie10' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
}

// Minify custom JS
function minifyJS() {
  return gulp.src(['js/navigation.js', 'js/lazy-loading.js', 'js/resume.js'])
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

// Optimize images
async function optimizeImages() {
  // Dynamic import untuk ESM modules
  const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
  const imageminPngquant = (await import('imagemin-pngquant')).default;
  
  return gulp.src('img/**/*.{jpg,jpeg,png}')
    .pipe(imagemin([
      imageminMozjpeg({
        quality: 85,
        progressive: true
      }),
      imageminPngquant({
        quality: [0.8, 0.9],
        speed: 4
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('img'));
}

// Generate responsive image sizes
function generateResponsiveImages() {
  // Note: This requires manual processing or additional tools like sharp
  // For now, this is a placeholder that copies images
  // In production, use tools like sharp or imagemagick to generate multiple sizes
  console.log('Note: Generate responsive images manually using sharp or imagemagick');
  console.log('Required sizes: 480w (sm), 768w (md), 1200w (lg)');
  return Promise.resolve();
}

// Copy vendor files from /node_modules into /vendor
function copyVendor() {
  // Copy Bootstrap
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'));

  // Copy Font Awesome (if using local version)
  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'));

  // Copy Devicons
  gulp.src([
      'node_modules/devicons/**/*',
      '!node_modules/devicons/*.json',
      '!node_modules/devicons/*.md',
      '!node_modules/devicons/!PNG',
      '!node_modules/devicons/!PNG/**/*',
      '!node_modules/devicons/!SVG',
      '!node_modules/devicons/!SVG/**/*'
    ])
    .pipe(gulp.dest('vendor/devicons'));

  // Copy Simple Line Icons
  return gulp.src([
      'node_modules/simple-line-icons/**/*',
      '!node_modules/simple-line-icons/*.json',
      '!node_modules/simple-line-icons/*.md'
    ])
    .pipe(gulp.dest('vendor/simple-line-icons'));
}

// Configure BrowserSync
function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch('scss/**/*.scss', gulp.series(compileSass, minifyCSS));
  gulp.watch(['js/navigation.js', 'js/lazy-loading.js', 'js/resume.js'], gulp.series(minifyJS, browserSyncReload));
  gulp.watch('*.html', browserSyncReload);
}

// Define complex tasks
const build = gulp.series(compileSass, minifyCSS, minifyJS);
const buildWithImages = gulp.series(compileSass, minifyCSS, minifyJS, optimizeImages);
const watch = gulp.parallel(watchFiles, browserSyncServe);

// Export tasks
exports.sass = compileSass;
exports.minifyCSS = minifyCSS;
exports.minifyJS = minifyJS;
exports.images = optimizeImages;
exports.responsiveImages = generateResponsiveImages;
exports.copy = copyVendor;
exports.build = build;
exports.buildFull = buildWithImages;
exports.watch = watch;
exports.dev = gulp.series(build, watch);
exports.default = build;
