'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Icons from "react-bootstrap-icons";

function SearchField({ active, onClick, children }) {
  return (
    <div
      className={"px-3 py-2 rounded-lg mb-2 text-sm mx-1 border border-slate-200  cursor-pointer  hover:bg-slate-200 hover:text-black " +
        (active ? 'bg-slate-200 text-slate-600' : 'text-slate-500')}
      // ''}
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
      query: "Which bird species exhibits the most complex nest-building behavior?",
      images: ["bower_1.jpeg", "bower_2.jpeg", "bower_3.jpeg"],
    },
    {
      query: "What is the primary adaptation that allows birds to fly?",
      images: ["condor_1.jpeg", "condor_2.jpeg", "condor_3.jpeg", "condor_4.jpeg"],
    },
    {
      query: "Which mechanism enables birds to manipulate objects with their beaks?",
      images: ["distal_1.jpeg", "distal_2.jpeg", "distal_3.jpeg"],
    },
    {
      query: "What defensive strategy do some caterpillars use against predators?",
      images: ["swallowtail_1.jpeg", "swallowtail_2.jpeg", "swallowtail_3.jpeg", "swallowtail_4.jpeg"],
    },
    {
      query: "Which behavior demonstrates parental care in mammals?",
      images: ["tamandua_1.jpeg", "tamandua_2.jpeg", "tamandua_3.jpeg"],
    },
    {
      query: "What is an example of brood parasitism in birds?",
      images: ["nest_1.jpeg", "nest_2.jpeg", "nest_3.jpeg"],
    },
    {
      query: "Which adaptation allows hermit crabs to survive in changing environments?",
      images: ["hermit_1.png", "hermit_2.png", "hermit_3.png", "hermit_2.png"],
    },
    {
      query: "What causes cassava plants to become diseased?",
      images: ["cassava_1.jpeg", "cassava_2.jpeg", "cassava_3.jpeg", "cassava_4.jpeg"],
    },
  ];

  const clickSearch = function (idx) {
    // console.log('cleared ' + intervalID)
    setUseInterval(false);
    setActiveIdx(idx);
  }

  useEffect(() => {
    // clearInterval(intervalID);
    //   if (intervalID == null) {
    //     console.log('new interval!')
    //     setIntervalID((id) => {
    //         console.log('current id: ' + id + '  ' + intervalID);
    //         if (id == null) {

    //             clearInterval(intervalID);
    //             const newID = setInterval(() => {
    //                 console.log('ping')
    //                 setActiveIdx((idx) => (idx+1) % searches.length)
    //             }, 2000)
    //             console.log('new interval id: ' + newID);
    //             return newID;
    //         } else {
    //             return id;
    //         }


    //     });
    //     // setIntervalID(intervalID);
    console.log('new interval')
    if (useInterval) {
      const newID = setInterval(() => {
        console.log('ping')
        setActiveIdx((idx) => (idx + 1) % searches.length)
      }, 2000)
      return () => clearInterval(newID)
    }
    // }
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
              <a className="text-sky-500" href="#" target="_blank">Leonie Bossemeyer</a><sup>1</sup>
            </div>
            <div>
              <sup> 1</sup>Pieces for Developers & PhD Student in Machine Learning
            </div>
            <div className="mt-8">
              {/* <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="#">
                            <Icons.FilePdfFill className="w-4 h-4 inline mr-2"/>
                            Paper
                        </a> */}
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" target="_blank" href="#">
                <Icons.FileEarmarkText className="w-4 h-4 inline mr-2" />
                Paper
              </a>
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" target="_blank" href="#">
                <Icons.Github className="w-4 h-4 inline mr-2" />
                Code
              </a>
              <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" target="_blank" href="#">
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
          <div></div>
          {/* <div className="text-3xl font-regular text-left mb-8 text-slate-700">
                  A Benchmark for Scientific Image Retrieval
              </div> */}
          <div className="mt-8 text-md font-regular  mb-8 text-slate-700">
            <b>Understanding human knowledge requires fine-grained assessment.</b>
            <br /><br />

            We introduce <b>CleverBirds</b>, a multiple-choice benchmark for fine-grained human knowledge tracing that evaluates
            understanding across diverse domains and cognitive levels. CleverBirds provides a comprehensive framework for
            assessing knowledge acquisition, retention, and transfer in educational contexts.
          </div>

          <div className=" bg-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="flex flex-wrap justify-center">
              {searches.map((search, idx) => (
                <SearchField key={idx} active={idx == activeIdx} onClick={() => { clickSearch(idx) }}>{search.query}</SearchField>
              ))}
              {/* <SearchField>A clownfish living among sea anemone tentacles</SearchField>
                          <SearchField>A hermit crab using plastic trash as its shell</SearchField>
                          <SearchField>Distal rynchokineses</SearchField>
                          <SearchField>California condor tagged with a green “26"</SearchField>
                          <SearchField>Everted osmetrium</SearchField> */}
            </div>

            <div className="mt-2  px-5 w-full h-full rounded-lg">

              <div className="mt-2 text-lg px-2 py-2.5 mb-4 text-slate-700 text-center rounded-lg bg-white border border-slate-200">
                {/* <Icons.Search className="inline w-5 h-5 mr-3 mb-1" /> */}
                {searches[activeIdx].query}
              </div>

              <div className="rounded-lg p-2 flex flex-wrap justify-center" key={activeIdx}>
                {searches[activeIdx].images.map((im, idx) => (
                  // <Image
                  //     className="w-40 h-40 object-cover m-2"
                  //     width={160}
                  //     height={160}
                  //     src={`/images/queries/${im}`}
                  //     // style={{ "aspectRatio": "1" }}
                  //     alt={'Image retrieval'}
                  //     priority={true}
                  //     key={idx}
                  // />    
                  <div className="w-32 h-32 lg:w-40 lg:h-40 m-1"
                    style={{ background: `url('/images/queries/${im}') center / cover`, backgroundRepeat: 'no-repeat' }}
                    key={idx}></div>
                ))}
              </div>

            </div>
          </div>
          <div className="mt-4 text-center text-slate-700">
            Want to try the benchmark? Check out the <a className="text-sky-500 underline" href="#" target="_blank">interactive demo &rarr;</a>.
          </div>
        </div>
      </div>


      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Questions
      </div>
      <div className="w-full bg-white py-8">

        <div className="max-w-[900px] px-6 m-auto">

          <div>
            CleverBirds contains carefully crafted multiple-choice questions designed to assess fine-grained human knowledge across diverse domains including biology, ecology, animal behavior, and natural sciences.
          </div>

          <div className="mt-4">
            Each question is designed to test specific knowledge components, from basic recall to complex reasoning and application skills.
          </div>
          <div className="mt-4">
            Our questions cover multiple cognitive levels and knowledge domains:
          </div>

          <div className="flex flex-wrap justify-center mt-4">
            <div className="bg-slate-100 p-4 rounded-lg mx-2 mb-4">
              <h3 className="font-bold mb-2">Knowledge Domains</h3>
              <ul className="text-sm">
                <li>• Animal Behavior</li>
                <li>• Ecological Adaptations</li>
                <li>• Biological Processes</li>
                <li>• Environmental Science</li>
              </ul>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg mx-2 mb-4">
              <h3 className="font-bold mb-2">Cognitive Levels</h3>
              <ul className="text-sm">
                <li>• Recall & Recognition</li>
                <li>• Comprehension</li>
                <li>• Application</li>
                <li>• Analysis & Synthesis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Benchmark Tasks
      </div>
      <div className="w-full bg-white py-8">

        <div className="max-w-[900px] px-6 m-auto">

          <div className="mb-4">CleverBirds includes several evaluation tasks: </div>
          <div className="mt-2">
            <b>Knowledge Tracing: Predicting individual learning progress</b>
            <br />
            This task evaluates how well models can predict a learner's knowledge state and future performance based on their response history and question characteristics.
          </div>
          <div className="mt-2">
            <b>Difficulty Prediction: Estimating question difficulty levels</b>
            <br />
            This task assesses the ability to predict question difficulty and identify which questions are most challenging for different knowledge levels.
          </div>
          <div className="mt-2">
            <b>Adaptive Assessment: Dynamic question selection</b>
            <br />
            This task evaluates systems that can adaptively select questions based on current knowledge estimates to optimize learning outcomes.
          </div>

          <div className="text-blue-500 mt-4">
            The benchmark supports both individual and population-level analysis, enabling research into personalized learning and educational technology. <br />
            CleverBirds is designed to be accessible for researchers working on educational AI and knowledge assessment.
          </div>

          <div className="flex flex-wrap justify-center mt-8">
            <div className="bg-slate-100 p-6 rounded-lg mx-2 mb-4 max-w-md">
              <h3 className="font-bold mb-3">Evaluation Metrics</h3>
              <ul className="text-sm space-y-1">
                <li>• Accuracy & Precision</li>
                <li>• Knowledge State Estimation</li>
                <li>• Learning Curve Analysis</li>
                <li>• Difficulty Calibration</li>
                <li>• Transfer Learning Performance</li>
              </ul>
            </div>
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
              The benchmark includes multiple-choice questions across various knowledge domains, designed to assess different cognitive levels and learning outcomes.
            </div>
            <div className="mt-0">
              Question metadata and answer keys are available in our
              <a className="underline font-bold ms-1" target="_blank" href="#">GitHub repository.</a>
            </div>
            <div className="mt-4">
              Each question includes difficulty ratings, domain classifications, and cognitive level indicators to support comprehensive analysis.
            </div>
          </div>

          <div className="border border-slate-200 p-4 rounded-lg bg-slate-100 mb-4">
            <div className="text-2xl font-bold text-slate-700">Response Data</div>
            <div className="mt-2">
              The dataset includes anonymized student response patterns, learning trajectories, and performance metrics across different question types.
            </div>
            <div className="mt-0">
              Response data is structured to support knowledge tracing analysis and includes temporal information for tracking learning progress.
            </div>
          </div>

          <div className="border border-slate-200 p-4 rounded-lg bg-slate-100 mb-4">
            <div className="text-2xl font-bold text-slate-700">Metadata & Annotations</div>
            <div className="mt-2">
              Comprehensive metadata includes question difficulty estimates, domain classifications, prerequisite knowledge requirements, and learning objective mappings.
            </div>
            <div className="mt-0">
              Expert annotations provide ground truth for question characteristics and support validation of automated difficulty prediction models.
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
