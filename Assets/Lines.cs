using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Lines : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        LineRenderer l = gameObject.AddComponent<LineRenderer>();
        new Svg(l, Color.white, 0.1f)
            .drawCircle(3)
            .draw();
    }

    void Update()
    {
        
    }


}
