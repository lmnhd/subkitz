"use client";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import { list } from "aws-amplify/storage";
import { Button } from "@aws-amplify/ui-react";
import { downloadToMemory, getS3URL } from "./servertasks";
import * as Tone from "tone";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "../amplifyconfiguration.json";
import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { get } from "http";

Amplify.configure(config);

export function Home() {
  const [audio, setAudio] = useState<any>(null);
  const [soundList, setSoundList] = useState<string[]>([]);
  const [player1, setPlayer1] = useState<Tone.Player>(
    new Tone.Player().toDestination()
  );
  useEffect(() => {
    const load = async () => {
     const res = await getList();
      setSoundList(res);
      console.log("res", res);
    };
    load();
  }, []);

  const getList = async () => {
    const result = await list({
      prefix: "9th Wonder Kit/",
      options: { accessLevel: "guest" },
    });
    console.log("result", result);
    return result.items.map((item) => {
      return item.key;
    });
  };

  const Start_Audio = async () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    } else {
      Tone.start();
    }
  };
  const loadSound = async (s3Path: string) => {
    const url = await getS3URL(s3Path);
    console.log("url", url);
    const player = new Tone.Player(url.href).toDestination();
    setPlayer1(player);
    console.log("loaded", player);
  };
  const getSoundFile = async (s3Path: string) => {
    const blob: any = await downloadToMemory("");
    setAudio(blob);
    console.log("blob", blob);

    const player = new Tone.Player(blob, () => {}).toDestination();
    setPlayer1(player);
    return blob;
  };

  const previewSound = async (s3Path: string) => {
    //const sound:any = await getSoundFile("");
    if (true) {
      const url = await getS3URL(s3Path);
      console.log("playing");
      const sound = new Howl({
        src: url.href,
      });
      sound.play();
      //Start_Audio();
      //player1.start();
    }
  };

  //getList()
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold text-center text-amber-500">
        SUBKITZ...
      </h1>
      <p className="w-2/3 ml-auto mr-10 text-right">
        rhythm composition repository by lmnhd
      </p>
      <Button
        content="Click Me"
        className="w-1/2"
        onClick={() => loadSound("9th Wonder Kit/hat1.wav")}
      >
        load
      </Button>
      <Button
        content="Click Me"
        className="w-1/2"
        onClick={() => previewSound(audio)}
      >
        play
      </Button>
      {/* <input
     type='file'
    
     onChange={check}
     /> */}

     {soundList && soundList.map((sound) => {
        return <Button
        
        className="w-1/2 text-lg text-white"
        onClick={() => previewSound(sound)}>
          {sound}
        </Button>
     })}
    </main>
  );
}
export default withAuthenticator(Home);
