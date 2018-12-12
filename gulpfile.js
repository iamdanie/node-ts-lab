"use strict";
let gulp = require("gulp");
let sourcemaps = require("gulp-sourcemaps");
let typescript = require("gulp-typescript");
let nodemon = require("gulp-nodemon");
let tslint = require("gulp-tslint");
let runSequence = require("run-sequence");
let rimraf = require("rimraf");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let plumber = require("gulp-plumber");

const CLEAN_BUILD = "clean:build";
const CLEAN_COVERAGE = "clean:coverage";
const TSLINT = "tslint";
const COMPILE_TYPESCRIPT = "compile:typescript";
const COPY_STATIC_FILES = "copy:static";
const BUILD = "build";
const PRETEST = "pretest";
const RUN_TESTS = "run:tests";
const TEST = "test";

const TS_SRC_GLOB = "./src/**/*.ts";
const TS_TEST_GLOB = "./test/**/*.ts";
const JS_TEST_GLOB = "./build/**/*.js";
const JS_SRC_GLOB = "./build/**/*.js";
const TS_GLOB = [TS_SRC_GLOB];
const STATIC_FILES = ['./src/**/*.json']

const tsProject = typescript.createProject("tsconfig.json");

gulp.task(CLEAN_BUILD, function(callback) {
    rimraf("./build", callback);
});

gulp.task(CLEAN_COVERAGE, function(callback) {
    rimraf("./coverage", callback);
});

gulp.task(TSLINT, function() {
    return gulp.src(TS_GLOB)
        .pipe(tslint({formatter: "verbose"}))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task(COPY_STATIC_FILES, function() {
    return gulp.src(STATIC_FILES)
    .pipe(gulp.dest("build"));
});

gulp.task(COMPILE_TYPESCRIPT, function() {
    return gulp.src(TS_GLOB)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", { sourceRoot: "../src" }))
        .pipe(gulp.dest("build"));
});

gulp.task(BUILD, function(callback) {
    runSequence(CLEAN_BUILD, TSLINT, COMPILE_TYPESCRIPT, COPY_STATIC_FILES, callback);
});

gulp.task(PRETEST, function() {
    gulp.src(JS_SRC_GLOB)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire())
});

gulp.task(RUN_TESTS, function(callback) {
    let mochaError;
    gulp.src(JS_TEST_GLOB)
        .pipe(plumber())
        .pipe(mocha({reporter: "spec"}))
        .on("error", function(err) {
            mochaError = err;
        })
        .pipe(istanbul.writeReports({
            reporters: ["json"]
        }))
        .on("end", function() {
            callback(mochaError);
        });
});

gulp.task(TEST, function(callback) {
    runSequence(BUILD, CLEAN_COVERAGE, PRETEST, RUN_TESTS, callback);
});

gulp.task("watch", [BUILD], function() {
    return nodemon({
        ext: "ts js json",
        script: "build/server.js",
        watch: ["src/*", "test/*"],
        tasks: [BUILD]
    });
});
