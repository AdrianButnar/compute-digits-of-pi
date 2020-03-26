# Compute digits of π using elastic collisions

<!-- gif part -->
![](sample.gif)

## 1. Motivation
The whole idea of this project started from this awesome 3Blue1Brown <a href="https://www.youtube.com/watch?v=HEfHFsfGXjs"> youtube video </a>.
He has a wonderful channel and 3 videos presenting how elastic collisions can relate to the notion of phase(phase diagram) and yield the digits of π.
Detailed information can be found in the following <a href="https://s3.amazonaws.com/academia.edu.documents/60367449/Galperin._Playing_pool_with_pi20190822-56122-1oez89j.pdf?response-content-disposition=inline%3B%20filename%3DPLAYING_POOL_WITH__THE_NUMBER__FROM_A.pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWOWYYGZ2Y53UL3A%2F20200312%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200312T204435Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=96f5577decd15f2fd8f6dc72074099b250489a89efc8fd555c87350507b153f5"> paper </a>.

## 2. Brief description
I will, however, provide a short explanation about the parameters involved in this simulation and how the dynamics of the system evolves.

The experiment involves two blocks set on a frictionless surface (μ = 0), having a wall on the left side. The leftmost block has initial velocity v<sub>1</sub> = 0, while the other block has an initial speed v<sub>2</sub> > 0, oriented towards the first one.

Because of the lack of friction, both the kinetic energy and the momentum will be conserved, more specifically:

<img src="https://render.githubusercontent.com/render/math?math=m_{\mathrm{1}} v_{\mathrm{1}}%2Bm_{\mathrm{2}} v_{\mathrm{2}}=m_{\mathrm{1}} v_{\mathrm{1}}^{\prime}%2Bm_{\mathrm{2}} v_{\mathrm{2}}^{\prime}">

and

<img src="https://render.githubusercontent.com/render/math?math=\frac{1}{2} m_{\mathrm{1}} v_{\mathrm{1}}^{2}%2B\frac{1}{2} m_{\mathrm{2}} v_{\mathrm{2}}^{2}=\frac{1}{2} m_{\mathrm{1}} v_{\mathrm{1}}^{\prime 2}%2B\frac{1}{2} m_{\mathrm{2}} v_{\mathrm{2}}^{\prime 2}"> 

<br>allowing us to determine the speed of each block after impact:

<br><img src="https://render.githubusercontent.com/render/math?math=v_{1}^{\prime}=\frac{m_{1}-m_{2}}{m_{1}%2Bm_{2}} v_{1}%2B\frac{2 m_{2}}{m_{1}%2Bm_{2}} v_{2}">

<br><img src="https://render.githubusercontent.com/render/math?math=v_{2}^{\prime}=\frac{2 m_{1}}{m_{1}%2Bm_{2}} v_{1}-\frac{m_{1}-m_{2}}{m_{1}%2Bm_{2}} v_{2}">


<br>The key point is setting the mass of the right block to be 100<sup>n</sup> times the mass of the left block. The reasons behind this are related to the notion of phase (phase diagrams) and the approximation of small angles with the angles themselves, in this case arctan(x) ≈ x.

For further technical details, please do check the valuable resources mentioned above.

P.s.: As today is March 14, happy π day!

Update: A hosted version can be found <a href = "https://tennis.ml/compute-digits-of-pi">here</a>.


