Raycaster created by Muhammad Talha. Can be viewed at https://mtalha123.github.io/

# Please Read
I chose to implement this raycaster in a fragment shader because it would offer the best performance. This is because shaders are run directly on the GPU which, unlike the CPU, specialises in the rendering of graphics. Gaining such a good FPS would be difficult on an implementation which would run on the CPU since raycasting is a relatively heavy process. Furthermore, raycasting is a task which can be parallelised because each individual pixel is not dependent on the outcome of any other pixel, making it totally independent. This type of task is perfect for the GPU because all of it's cores can be utilised simultaneously, resulting in amazing performance.    
