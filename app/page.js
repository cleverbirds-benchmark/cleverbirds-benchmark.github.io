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
      query: "A hermit crab using plastic trash as its shell",
      images: ["hermit_1.png", "hermit_2.png", "hermit_3.png", "hermit_2.png"],
    },
    {
      query: "Distal rynchokinesis",
      images: ["distal_1.jpeg", "distal_2.jpeg", "distal_3.jpeg"],
    },
    {
      query: "California condor tagged with a green \"26\"",
      images: ["condor_1.jpeg", "condor_2.jpeg", "condor_3.jpeg", "condor_4.jpeg"],
    },
    {
      query: "Everted osmeterium",
      images: ["swallowtail_1.jpeg", "swallowtail_2.jpeg", "swallowtail_3.jpeg", "swallowtail_4.jpeg"],
    },
    {
      query: "An ornamented bowerbird nest",
      images: ["bower_1.jpeg", "bower_2.jpeg", "bower_3.jpeg"],
    },
    {
      query: "A nest brood parasitized by a cowbird",
      images: ["nest_1.jpeg", "nest_2.jpeg", "nest_3.jpeg"],
    },
    {
      query: "A sick cassava plant",
      images: ["cassava_1.jpeg", "cassava_2.jpeg", "cassava_3.jpeg", "cassava_4.jpeg"],
    },
    {
      query: "Tamandua back-brooding its young",
      images: ["tamandua_1.jpeg", "tamandua_2.jpeg", "tamandua_3.jpeg"],
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
              CleverBirds
            </div>
            <div className="mt-2 text-3xl font-regular mb-10 text-slate-700">
              A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing
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
            CleverBirds
          </div>
          <div className="mt-8 text-md font-regular  mb-8 text-slate-700">
            <b>Understanding human knowledge requires fine-grained assessment.</b>
            <br /><br />

            We introduce <b>CleverBirds</b>, a multiple-choice benchmark for fine-grained human knowledge tracing.
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
            Want to try the benchmark? Check out the <a className="text-sky-500 underline" href="#">interactive demo &rarr;</a>.
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Questions
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div>
            CleverBirds contains multiple-choice questions designed to assess fine-grained human knowledge.
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Tasks
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="mb-4">CleverBirds includes evaluation tasks: </div>
          <div className="mt-2">
            <b>Knowledge Tracing: Predicting individual learning progress</b>
          </div>
          <div className="mt-2">
            <b>Difficulty Prediction: Estimating question difficulty levels</b>
          </div>
          <div className="mt-2">
            <b>Adaptive Assessment: Dynamic question selection</b>
          </div>
        </div>
      </div>


      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Dataset
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="border border-slate-200 p-4 rounded-lg bg-slate-100 mb-4">
            <div className="text-2xl font-bold text-slate-700">CleverBirds Questions</div>
            <div className="mt-2">
              Multiple-choice questions designed to assess fine-grained human knowledge.
            </div>
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Citation
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div>
            If you found CleverBirds useful, please consider citing our work:
          </div>

          <pre className="mt-4 bg-slate-100 p-4 rounded-lg text-xs text-wrap">
            @article{"{"}bossemeyer2024cleverbirds,
            <br />
            &nbsp;&nbsp;title={"{"}CleverBirds: A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing{"}"},
            <br />
            &nbsp;&nbsp;author={"{"}Bossemeyer, Leonie{"}"},
            <br />
            &nbsp;&nbsp;journal={"{"}arXiv preprint{"}"},
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