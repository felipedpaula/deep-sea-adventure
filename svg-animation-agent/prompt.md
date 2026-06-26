You are given a static SVG file located in the 'static-svg' folder, placeholder name '[STATIC-SVG]'. Your sole task is to add internal animation to this file and save exactly ONE high-quality animated SVG file inside the 'animated-svg' folder, naming it '{archive-name}-animated.svg'.

CRITICAL INSTRUCTIONS - DO NOT DEVIATE:
1. OUTPUT ONLY THE SVG FILE: Do not build an HTML page, a laboratory interface, a dashboard, or web previews. Do not wrap the solution in any code other than the raw SVG file saved directly to the requested folder.
2. NO VISUAL ALTERATIONS OR HALLUCINATIONS: Do not alter the original design, colors, gradients, or textures of the SVG. Do not add mythical effects, neon/bioluminescent glows, or extra graphical elements. The original artwork must remain exactly the same as the input.
3. ANIMATION REQUIREMENTS: Create a single, seamless loop version focusing exclusively on minimalist, smooth, and gentle animations. The movement must be very subtle, mimicking natural physics. Avoid high-velocity, rapid, or exaggerated motions.
4. PERFECT SEAMLESS LOOP: The animation *must* begin in the exact same physical position it ends, with the keyframes perfectly aligned at 0% and 100%, and an intermediate keyframe to allow motion. Do not create abrupt transitions or jarring cuts in the loop.
5. CODE STRUCTURE: Inject the animation directly inside the SVG code using clean and optimized CSS (@keyframes) or SMIL. Do not use external Javascript or external stylesheets.
6. NO VALIDATION OR TESTING: Do not attempt to open a browser, take screenshots, or run validation loops to test the animation. Follow this exact straight line: Analyze the input SVG -> Apply the animation -> Save the file -> Done.
7. BOUNDARY SAFETY: Ensure the animation *never* pushes elements outside of the visible area. To prevent clipping, you MUST check the proximity of elements to the edge and, if required, slightly increase the SVG's `viewBox` size (by, for example, 5-10% of padding) and re-center the image. This creates a safety buffer to ensure no part of the animation, however subtle, disappears off the canvas.

ADDITIONAL ANIMATION INSTRUCTIONS:
[PROMPT]