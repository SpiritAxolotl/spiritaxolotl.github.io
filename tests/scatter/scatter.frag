#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform sampler2D sampler0;
uniform float samplertime0;
uniform vec4 mouse;

//originally written by Spax

out vec4 fragColor;

//rgb2hsv and hsv2rgb written by XeroOl
//All components are in the range [0...1], including hue.
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float random3d(vec3 seed) {
  return fract(sin(dot(seed, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
}

float random2d(vec2 seed) {
  return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
}

float random1d(float seed) {
  return fract(sin(seed) * 43758.5453);
}

void main() {
  float speed = 46.0/60.0;
  float offset = -3.65;
  float seed = max(0.0, floor(min(213.0, (samplertime0 > 0. ? samplertime0 : time))*speed+offset));
  //float seed = max(0.0, floor(min(213.0, time)*speed+offset));
  vec2 uv = gl_FragCoord.xy/resolution.xy;
  float res = 64.; //1-255
  res = mouse.z>=0.0 || mouse.x>0.0 ? pow(2.0, round(mouse.x/resolution.x*8.0)) : res;
  float intensity = 0.9; //0-1
  
  vec4 image = texture(sampler0, uv);
  vec3 colorrgb = round(image.xyz*res)/res;
  //vec3 colorhsv = rgb2hsv(image.xyz);
  
  /*vec3 randColor = vec3(
    colorhsv.x*((random3d(colorhsv+seed)*0.75)+0.5),
    colorhsv.y*((random3d(colorhsv+seed)*0.75)+0.5),
    colorhsv.z*((random3d(colorhsv+seed)*0.75)+0.5)
  );*/
  /*vec3 randColor = vec3(
    colorhsv.x,
    random1d(seed + colorhsv.y),
    abs(random2d(fract(time*st)) + colorhsv.z)
  );*/
  vec3 randColor = vec3(
    colorrgb.r*(1.0-intensity)+(intensity)*random3d((seed + 0.01) * (colorrgb+0.5)), //colorrgb.x,
    colorrgb.g*(1.0-intensity)+(intensity)*random3d((seed + 0.33) * (colorrgb+0.5)), //colorrgb.y,
    colorrgb.b*(1.0-intensity)+(intensity)*random3d((seed + 0.67) * (colorrgb+0.5))  //colorrgb.z
  );
  
  //fragColor = vec4(image.xyz,1.0);
  fragColor = vec4(randColor, 1.0);
  //fragColor = vec4(hsv2rgb(randColor),1.0);
}
