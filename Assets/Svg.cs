using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;
/*
   var canvas1 = document.getElementById("canvas");
  var template = document.getElementById("template").getAttribute("d").split(/[\s,]+/);

  let M = x => y => ctx.moveTo(x, y);
  let L = x => y => ctx.lineTo(x, y);
  let C = x1 => y1 => cx => cy => x2 => y2 => ctx.bezierCurveTo(x1, y1, cx, cy, x2, y2);

  var ctx = canvas1.getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);

  ctx.beginPath();

  for (let i = 0, f = undefined; i < template.length; i++) {
    if (f === undefined) switch (template[i]) {
      case "M": { f = M; break; }
      case "L": { f = L; break; }
      case "C": { f = C; break; }
      default: break;
    }
    else { f = f(template[i]) }
  }
  ctx.fill();
 */
public class Svg
{
    // https://www.codeproject.com/Articles/375166/Functional-Programming-in-Csharp
    // https://habr.com/ru/post/143465/

    public Svg(LineRenderer lineRenderer, Color color, float width)
    {
        this.lineRenderer = lineRenderer;
        this.lineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        this.lineRenderer.startColor = color;
        this.lineRenderer.endColor = color;
        this.lineRenderer.startWidth = width;
        this.lineRenderer.endWidth = width;
        this.lineRenderer.useWorldSpace = true;
    }

    List<Vector3> positions = new List<Vector3>();
    LineRenderer lineRenderer;

    public Svg drawCircle(float radius, int segments = 60)
    {
        for (float i = 0; i < 361; i += 360 / segments)
        {
            var radian = Mathf.Deg2Rad * i;
            positions.Add(new Vector3(Mathf.Sin(radian) * radius, Mathf.Cos(radian) * radius, 0));
        }
        return this;
    }

    public void draw()
    {
        this.lineRenderer.positionCount = positions.Count;
        this.lineRenderer.SetPositions(positions.ToArray());
    }
}
