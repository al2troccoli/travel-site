var gulp = require("gulp")
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create();

gulp.task("watch", function(){
    
    browserSync.init({
        host: "192.168.1.133",
        notify: false,
        server:{
            baseDir: "app"
        }
    })

    watch("./app/index.html", function(){
       browserSync.reload();
    });

    /* cuando se registran cambios en los css se ejecuta cssInject */
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start("cssInject");
    });
});

/* el task "styles"" se pasa como dependencia de esta nueva tarea que solo se ejectura cuando styles haya terminado, luego se toma el fichero styles.css generado y se utiliza browserSync para inyectarlo en el browser  */
gulp.task("cssInject", ['styles'], function(){
    return gulp.src("app/temp/styles/styles.css")
        .pipe(browserSync.stream());
});