using System.Collections;
using System.Collections.Generic;
using UnityEngine.Audio;
using UnityEngine.UI;
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    // public AudioSource mixer;
    public Sprite stop;
    public Sprite start;

    bool play = false;
    public void Toggle()
    {
        // mixer.SetFloat("master", play ? -80 : 0);
        AudioSource mixer = gameObject.GetComponent<AudioSource>();
        if (play) mixer.Stop(); else mixer.Play();
        play = !play;

        Button button = this.gameObject.GetComponent<Button>();
        button.image.sprite = play ? stop : start;
    }
}
