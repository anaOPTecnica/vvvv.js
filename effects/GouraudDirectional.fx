
vertex_shader:

attribute vec3 PosO <POSITION>;
attribute vec2 TexCd <TEXCOORD0>;

uniform mat4 Texture_Transform;
uniform mat4 tW <WORLD>;
uniform mat4 tV <VIEW>;
uniform mat4 tP <PROJECTION>;

uniform vec3 Light_Direction_XYZ;
uniform vec4 Ambient_Color <COLOR>;
uniform vec4 Diffuse_Color <COLOR>;
uniform vec4 Specular_Color <COLOR>;
uniform float Power;

varying vec2 vs2psTexCd;
varying vec4 vs2psDiffuse;
varying vec4 vs2psSpecular;

vec4 lit(float NdotL, float NdotH, float m) {

  float ambient = 1.0;
  float diffuse = max(NdotL, 0.0);
  float specular = step(0.0, NdotL) * pow(max(NdotH, 0.0), m);

  return vec4(ambient, diffuse, specular, 1.0);
}

void main(void) {
  vec3 NormO = vec3(0, 0, 1);

  mat4 tWV = tV * tW;
  mat4 tWVP = tP * tWV;
  
  vec3 LightDirV = normalize(-1.0*(tV*vec4(Light_Direction_XYZ,1))).xyz;
  vec3 NormV = normalize(tWV * vec4(NormO, 0)).xyz;
  
  vec4 PosV = tWV * vec4(PosO, 1);
  vec3 ViewDirV = normalize(-PosV).xyz;
  
  vec3 H = normalize(ViewDirV + LightDirV);

  vec4 shades = lit(dot(NormV, LightDirV), dot(NormV, H), Power); 
  
  vs2psDiffuse = Diffuse_Color * shades.y + Ambient_Color;
  vs2psSpecular = Specular_Color * shades.z;

  gl_Position = (tWVP * vec4(PosO, 1.0));
  vs2psTexCd = (Texture_Transform * vec4(TexCd, 0, 1)).xy;
}


fragment_shader:

#ifdef GL_ES
precision highp float;
#endif

varying vec2 vs2psTexCd;
varying vec4 vs2psDiffuse;
varying vec4 vs2psSpecular;
uniform sampler2D Texture;
uniform float Alpha;

void main(void) {
  gl_FragColor = texture2D(Texture, vs2psTexCd);
  gl_FragColor *= vs2psDiffuse + vs2psSpecular;
  gl_FragColor.a = Alpha;
}