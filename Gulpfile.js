var Gulp = require("gulp");
var Stylus = require("gulp-stylus");
var Inject = require("gulp-inject");
var Rename = require("gulp-rename");
var Indent = require("indent-string");
var Sequence = require("gulp-sequence");

Gulp.task("build:stylus", function() {
  return Gulp.src("./examples/stylus/src/styles.styl")
    .pipe(Stylus({
      "include css": true
    }))
    .pipe(Gulp.dest("./examples/stylus/tmp"));
});

Gulp.task("generate:stylus:example", function() {
  return Gulp.src("./examples/_blueprints/tpl.html")
    .pipe(
      Inject(Gulp.src(["./examples/stylus/tmp/styles.css"]), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform: function(filePath, file) {
          return `<style>
${Indent(file.contents.toString('utf8'), 3, { indent: "\t" })}\t\t</style>`;
        }
      })
    )
    .pipe(Rename({
      basename: "index"
    }))
    .pipe(Gulp.dest("./examples/stylus"));
});

Gulp.task("build:examples", Sequence(['build:stylus'],['generate:stylus:example']));

Gulp.task('default',['build:examples']);
