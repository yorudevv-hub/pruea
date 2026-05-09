const { dest, watch, series, src } = require("gulp");

// css , sass
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// imagenes
const imagemin = require("gulp-imagemin").default;
const webp = require("gulp-webp").default;
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

// version webp
function imagenesWebp(done) {
  src("src/img/**/*.{jpg,png}")
    .pipe(webp())
    .pipe(dest("build/img"));

  done();
}

// version avif
function imagenesavif(done) {
  src("src/img/**/*.{jpg,png}")
    .pipe(avif())
    .pipe(dest("build/img"));

  done();
}

function imagenes(done) {
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));

  done();
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
}

exports.default = series(
  imagenes,
  imagenesWebp,
  imagenesavif,
  css,
  dev
);

exports.css = css;