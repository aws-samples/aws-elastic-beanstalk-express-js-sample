var fs          = require('fs');
var gulp        = require('gulp');
var exec        = require('gulp-exec');
var browserSync = require('browser-sync');

const config = 'docfx.json';
const server = browserSync.create();

function watched(){
  var content = fs.readFileSync(config);
  var json = JSON.parse(content);
  return json.build.content.reduce(function(flat, section) {
    return flat.concat(section.files);
  }, []);
};

function reload(done){
  server.reload();
  done();
}

function serve(done){
  server.init({
    server: {
      baseDir: './unitycontainer.github.io'
    }
  })
}

function build(){
  var reportOptions = {
    err: true,
    stderr: true,
    stdout: true
  };

  return gulp.src(config)
             .pipe(exec('docfx <%= file.name %>'))
             .pipe(exec.reporter(reportOptions));
}

const paths = watched();
const watch = () => gulp.watch(paths, gulp.series(build, reload));

exports.default = gulp.parallel(watch, serve);
exports.serve = serve;
exports.build = build;
exports.develop = exports.default;
