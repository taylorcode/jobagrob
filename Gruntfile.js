module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            default: {
                expand: true,
                cwd: 'dev/assets',
                src: ['**/*.coffee'],
                dest: 'target/assets',
                ext: '.js'
            }
        },

        compass: {
            default: {
                options: {
                    sassDir: 'dev/assets/stylesheets',
                    cssDir: 'target/assets/stylesheets'
                }
            }
        },

        /*compass: { // Task
            default: { // Target
                options: { // Target options
                    sassDir: 'dev/assets',
                    cssDir: 'target/assets/stylesheets',
                    environment: 'development'
                }
            },
            // dev: {                    // Another target
            //   options: {
            //     sassDir: 'sass',
            //     cssDir: 'css'
            //   }
            // }
        },*/
        htmlbuild: {
            default: {
                src: 'dev/index.html',
                dest: 'target/',
                options: {
                    beautify: true,
                    //prefix: '//some-cdn',
                    relative: true,
                    scripts: {
                        bundle: [
                            'target/assets/scripts/**/*.js',
                            '!target/assets/scripts/src/main.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            'target/assets/stylesheets/**/*.css'
                        ]
                    },
                    data: {
                        environment: 'dev'
                    }
                }
            }
        },
        copy: {
            default: {
                expand: true,
                cwd: 'dev/assets/views',
                src: '**/*.html',
                dest: 'target/assets/views',
                filter: 'isFile'
            }
        },
        watch: {
            coffeescript: {
                files: ['dev/assets/**/*.coffee'],
                tasks: ['newer:coffee', 'htmlbuild'] // we can specify newer:coffee:default TODO --- WHY DOES THIS NOT WORK ON NEWER?
            },
            compass: {
                files: ['dev/assets/**/*.sass'],
                tasks: ['newer:compass', 'htmlbuild']
            },
            copyhtml: {
                files: ['dev/assets/views/**/*.html'],
                tasks: ['newer:copy']
            }
        }
    });

    // load all tasks declared in devDependencies
    Object.keys(require('./package.json').devDependencies).forEach(function (dep) {
        if (dep.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(dep);
        }
    });

    // setup our workflow
    grunt.registerTask('default', ['watch']);
}