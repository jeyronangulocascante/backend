
# 100% Coverage:

We are looking for 100% Coverage, but only of the things that make sense to test. We are following the philosophy that testing 100% of the code just to achieve that 100% can be counterproductive (like the overnormalization of a Database model).

# So what do we test?

We want to test anything that can probably be changed in the future, to be sure that we catch breaking changes as soon as they happen.

# What don't we test? (This list can grow over time)

1. Basic language functionality, like enums, for example. An enum will always work like an enum, there's no need to test it. 
2. Objects that will throw an error when instantiating with the wrong fields. (Check: src/module_example/infrastructure/functions/hello/index.ts. If you add a non existent field called "test", it will fail with this error: "Object literal may only specify known properties, and 'test' does not exist in type...", so there is no need for its instantiation to have a unit test.)
3. External libraries. We must assume external libraries work as expected. (Check: src/module_example/infrastructure/libs/middyfy.ts.)

# How do we ignore files/lines so they do not affect our coverage?

We can use "// istanbul ignore file" (whole file) or "// istanbul ignore next" (next statement). This should be followed by another comment that explains the reason: "// WHY?: ...". There has to be a valid justification for ignoring the file/lines, and this should be checked during Code Review.
