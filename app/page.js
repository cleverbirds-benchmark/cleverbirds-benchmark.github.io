'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Icons from "react-bootstrap-icons";

function SearchField({ active, onClick, children }) {
  return (
    <div
      className={"px-3 py-2 rounded-lg mb-2 text-sm mx-1 border border-slate-200  cursor-pointer  hover:bg-slate-200 hover:text-black " +
        (active ? 'bg-slate-200 text-slate-600' : 'text-slate-500')}
      onClick={onClick}
      style={{ "lineHeight": "1.3em" }}
    >
      <Icons.Search className="inline w-4 h-4 mr-2 mb-0.5" />
      {children}
    </div>
  );
}

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [useInterval, setUseInterval] = useState(true);

  const searches = [
    {
      query: "Sample question 1",
      images: ["bower_1.jpeg", "bower_2.jpeg", "bower_3.jpeg"],
    },
    {
      query: "Sample question 2",
      images: ["condor_1.jpeg", "condor_2.jpeg", "condor_3.jpeg", "condor_4.jpeg"],
    },
    {
      query: "Sample question 3",
      images: ["distal_1.jpeg", "distal_2.jpeg", "distal_3.jpeg"],
    },
  ];

  const clickSearch = function (idx) {
    setUseInterval(false);
    setActiveIdx(idx);
  }

  useEffect(() => {
    if (useInterval) {
      const newID = setInterval(() => {
        setActiveIdx((idx) => (idx + 1) % searches.length)
      }, 2000)
      return () => clearInterval(newID)
    }
  }, [useInterval])

  return (
    <div className="min-w-[720px]">
      <div className="flex justify-center w-full h-screen bg-contain bg-center" style={{ 'background-image': 'url(images/background.jpg)', 'background-size': '1200px' }}>
        <div className="w-full max-w-[960px] m-auto mx-4">
          <div className="bg-white w-full py-8 px-12">
            <div className="text-[80px] font-medium flex items-center">
              Your Project
            </div>
            <div className="mt-2 text-3xl font-regular mb-10 text-slate-700">
              A Brief Description of Your Work
            </div>
            <div className="mb-2">
              Leonie Bossemeyer<sup>1</sup>
            </div>
            <div>
              <sup> 1</sup>PhD Student in Machine Learning
            </div>
            <div className="mt-8">
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="#">
                <Icons.FileEarmarkText className="w-4 h-4 inline mr-2" />
                Paper
              </a>
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="#">
                <Icons.Github className="w-4 h-4 inline mr-2" />
                Code
              </a>
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="#">
                <Icons.Image className="w-4 h-4 inline mr-2" />
                Data
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen bg-white pt-16 pb-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="text-[48px] font-medium text-center mb-2 items-center">
            Your Project
          </div>
          <div className="mt-8 text-md font-regular  mb-8 text-slate-700">
            <b>Brief introduction to your work.</b>
            <br /><br />

            Add your project description here. This is a template that you can customize with your own content.
          </div>

          <div className=" bg-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex flex-wrap justify-center">
              {searches.map((search, idx) => (
                <SearchField key={idx} active={idx == activeIdx} onClick={() => { clickSearch(idx) }}>{search.query}</SearchField>
              ))}
            </div>

            <div className="mt-2  px-5 w-full h-full rounded-lg">
              <div className="mt-2 text-lg px-2 py-2.5 mb-4 text-slate-700 text-center rounded-lg bg-white border border-slate-200">
                {searches[activeIdx].query}
              </div>

              <div className="rounded-lg p-2 flex flex-wrap justify-center" key={activeIdx}>
                {searches[activeIdx].images.map((im, idx) => (
                  <div className="w-32 h-32 lg:w-40 lg:h-40 m-1"
                    style={{ background: `url('/images/queries/${im}') center / cover`, backgroundRepeat: 'no-repeat' }}
                    key={idx}></div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-slate-700">
            Want to learn more? Check out the <a className="text-sky-500 underline" href="#">interactive demo &rarr;</a>.
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        About
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div>
            Add information about your project here. This section can describe your methodology,
            results, or any other relevant details.
          </div>
          <div className="mt-4">
            You can customize this content to match your specific research or project needs.
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Citation
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div>
            If you found this work useful, please consider citing:
          </div>

          <pre className="mt-4 bg-slate-100 p-4 rounded-lg text-xs text-wrap">
            @article{"{"}bossemeyer2024work,
            <br />
            &nbsp;&nbsp;title={"{"}Your Project Title{"}"},
            <br />
            &nbsp;&nbsp;author={"{"}Bossemeyer, Leonie{"}"},
            <br />
            &nbsp;&nbsp;journal={"{"}Your Journal{"}"},
            <br />
            &nbsp;&nbsp;year={"{"}2024{"}"},
            <br />
            {"}"}
          </pre>
        </div>
      </div>
    </div>
  );
}