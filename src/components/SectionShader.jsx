import { useEffect, useRef } from 'react'

export default function SectionShader({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')

    if (!gl) return

    // User's explicitly requested WebGL shader format
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        st.x *= u_resolution.x / u_resolution.y;

        vec4 bgColor1 = vec4(0.04, 0.04, 0.06, 1.0);
        vec4 bgColor2 = vec4(0.06, 0.06, 0.10, 1.0);
        vec4 lineColor = vec4(1.0, 1.0, 1.0, 1.0);

        float lines = 0.0;
        int linesPerGroup = 12;
        float overallSpeed = 0.15;
        float lineAmplitude = 0.6;
        float warpAmplitude = 0.5;

        for (int i = 0; i < 12; i++) {
          float fi = float(i);
          float t = u_time * overallSpeed + fi * 0.1;
          float y = sin(st.x * 2.0 + t) * lineAmplitude * 0.5 + 0.5;
          y += sin(st.x * 4.0 - t * 1.5) * warpAmplitude * 0.2;
          
          float lineDist = abs(st.y - y);
          lines += 0.005 / (lineDist + 0.001);
        }

        float depth = length(st - vec2(0.5));
        vec4 finalColor = mix(bgColor1, bgColor2, depth) + (lineColor * lines);
        gl_FragColor = finalColor * 0.45; // Fix 1 - Reduce Opacity & Darken
      }
    `

    const compileShader = (gl, type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)

    const initBuffers = (gl) => {
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      const positions = [-1, 1, 1, 1, -1, -1, 1, -1]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
      return positionBuffer
    }

    const positionBuffer = initBuffers(gl)
    const positionLocation = gl.getAttribLocation(program, 'aVertexPosition')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    let animationFrameId
    const startTime = performance.now()

    const render = (time) => {
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
      }

      gl.useProgram(program)
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(timeLocation, (time - startTime) * 0.001)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrameId = requestAnimationFrame(render)
    }

    render(performance.now())
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
