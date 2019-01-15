import Tone from 'tone';

var synth = new Tone.Synth({
    oscillator: {
        type: 'pwm',
        modulationType: 'sawtooth',
        modulationIndex: 3,
        harmonicity: 3.4
    },
    envelope: {
        attack: 0.003,
        decay: 0.2,
        sustain: 0.01,
        release: 0.01
    },
}).toMaster()

synth.volume.value = 0;

export const setSynthVolume = value => {
    return synth.volume.value = value * 0.5;
}

export const trigger = (note) => {
    synth.triggerAttackRelease(note, 0.1);
}

export default synth;