module.exports = function(grunt) {
    grunt.initConfig({
        less: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {
                    'dist/style.css': 'src/styles/style.less'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/style.min.css': ['dist/style.css']
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/styles/style.less'],
                tasks: ['less', 'cssmin'],
            },
        },
    });
    grunt.registerTask('default', ['less', 'watch:css']);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
