/* global require, module */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from node_modules to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/dist/js/',
                        src: ['**/*.min.js'],
                        dest: 'scripts'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/angular/',
                        src: ['**/*.min.js'],
                        dest: 'scripts'
                    },

                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: ['**/*.min.js', '**/*.min.map'],
                        dest: 'scripts/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'node_modules/',
                        src: ['bootstrap/dist/fonts/**'],
                        dest: 'fonts/'
                    },

                    // Stylesheets
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/dist/css/',
                        src: ['**/*.min.css'],
                        dest: 'styles/'
                    }
                ]
            },
        },
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Establish tasks we can run from the terminal.
    grunt.registerTask('build', ['copy']);

    grunt.registerTask('default', ['build']);
};
