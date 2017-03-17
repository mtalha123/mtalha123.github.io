Raytracer created by Muhammad Talha for the University of Waterloo application.

# Please Read
I chose to implement this raytracer in a fragment shader because it would offer the best performance. This is because shaders are run directly on the GPU which, unlike the CPU, specialises in the rendering of graphics. Gaining such a good FPS would be difficult on an implementation which would run on the CPU since raytracing is a relatively heavy process. Furthermore, raytracing is a task which can be parallelised because each individual pixel is not dependent on the outcome of any other pixel, making it totally independent. This type of task is perfect for the GPU because all of it's cores can be utilised simultaneously, resulting in amazing performance.    
