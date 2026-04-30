
// css , sass
const { dest, watch, series, src } = require("gulp");
const autoPrefixer = require("gulp-autoprefixer").default;

const sass = require("gulp-sass")(require("sass"));



// imagenes
const imagemin = require("gulp-imagemin").default;
const webp = require("gulp-webp").default;
const avif = require('gulp-avif');




// version webp
function imagenesWebp(done){
    src("src/img/**/*.{jpg,png}")
    .pipe(webp())
    .pipe(dest("build/img"))
    done();
}

// version avif
function imagenesavif(done){
    src("src/img/**/*.{jpg,png}")
    .pipe(avif())
    .pipe(dest("build/img"))
    done();
}


function css(done) {
  src("src/scss/style.scss")
    .pipe(sass())
    .pipe(autoPrefixer({ autoPrefixer}))
    .pipe(dest("build/css"));

  done();
}

function imagenes(done){
    src("src/img/**/*")
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest("build/img"))
    done();
}


function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
}




exports.default = series(imagenes, imagenesWebp, imagenesavif, css, dev);
exports.css = css;
