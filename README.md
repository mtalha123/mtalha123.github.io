Raytracer created by Muhammad Talha for the University of Waterloo application.

# Please Read
I chose to create this raytracer in a fragment shader because it would offer the optimal performance. This is because shaders are run directly on the GPU which specialises in the rendering of graphics. Gaining such a good FPS would be difficult on an implementation which would run on the CPU due to the fact that raytracing is a relatively heavy process. Furthermore, raytracing is a task which can be parallelised as each individual pixel is not dependent on the outcome of any other pixel, making it totally independant. This type of task is perfect for the GPU because all of it's cores can be utilised simultaneously, resulting in amazing performance.   
