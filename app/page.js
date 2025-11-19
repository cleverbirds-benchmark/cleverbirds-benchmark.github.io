'use client';

import Image from "next/image";
import * as Icons from "react-bootstrap-icons";
import { useState, useEffect } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  // Track page visit
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track visits (only in browser, not during SSR)
        if (typeof window !== 'undefined') {
          const apiUrl = process.env.NEXT_PUBLIC_TRACKING_API_URL || 'https://cleverbirds-tracking.vercel.app/api/track';
          await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              path: window.location.pathname,
            }),
          });
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.debug('Visit tracking failed:', error);
      }
    };

    trackVisit();
  }, []);

  const citationText = `@inproceedings{bossemeyercleverbirds,
  title={CleverBirds: A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing},
  author={Bossemeyer, Leonie and Heinrich, Samuel and Van Horn, Grant and Mac Aodha, Oisin},
  booktitle={The Thirty-ninth Annual Conference on Neural Information Processing Systems Datasets and Benchmarks Track}
}`;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };
  // Bird image asset IDs used in the backdrop image
  const birdImageIds = [
    '573697681', '428128071', '88531421', '211835021', '610451060', '72428651', '564023871', '116768801', '61383711', '316745031',
    '246875981', '92749501', '174757801', '608961847', '289306081', '614584584', '586246051', '300360751', '612959309', '178092791',
    '422231291', '612007611', '117594561', '87415241', '179573301', '611679955', '46165631', '551526071', '101165001', '134292171',
    '125987801', '450270361', '26554101', '610427401', '89210001', '537341591', '165370941', '614031554', '586608881', '586481701',
    '544108441', '235493731', '186111231', '560669831', '69662191', '406173031', '215047171', '327232121', '227464551', '160575501',
    '119087321', '68277481', '102836251', '166040121', '513049811', '92172161', '220455911', '116049931', '142874561', '602284521',
    '66677101', '230656561', '609684978', '585337501', '608937156', '284964471', '48680621', '191838061', '565126211', '160571121',
    '589092841', '620875620', '113700001', '357819031', '151864601', '195952631', '221405381', '175066671', '606431381', '173863411'
  ];

  return (
    <div className="w-full">
      <div className="relative flex justify-center w-full min-h-screen overflow-hidden bg-slate-50">
        {/* Single backdrop image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bird_backdrop.jpg"
            alt="Bird backdrop"
            fill
            className="object-cover opacity-80"
            // style={{ filter: 'brightness(1.0-)' }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Content overlay */}
        <div className="relative w-full max-w-[900px] px-4 sm:px-6 m-auto z-10 py-4 sm:py-8">
          <div className="bg-white w-full py-4 sm:py-6 px-6 sm:px-8 rounded-2xl sm:rounded-3xl">
            {/* <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-2 text-slate-800">
              CleverBirds
            </div> */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-regular text-center mb-4 sm:mb-6 text-slate-700">
              CleverBirds: A Multiple-Choice Benchmark for<br />Fine-grained Human Knowledge Tracing
            </div>
            <div className="mb-2 text-sm sm:text-base md:text-lg -mt-2 flex flex-wrap gap-4 sm:gap-5 md:gap-6 justify-center">
              <span><a href="https://bossemel.github.io/" className="text-blue-600 hover:text-blue-800">Leonie Bossemeyer</a></span>
              <span><a href="https://www.birds.cornell.edu/home/staff/sam-heinrich/" className="text-blue-600 hover:text-blue-800">Samuel Heinrich</a></span>
              <span><a href="https://gvh.codes/" className="text-blue-600 hover:text-blue-800">Grant Van Horn</a></span>
              <span><a href="https://homepages.inf.ed.ac.uk/omacaod/" className="text-blue-600 hover:text-blue-800">Oisin Mac Aodha</a></span>
            </div>
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                <a
                  className="bg-gray-200 hover:bg-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-slate-700 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md"
                  href="http://arxiv.org/abs/2511.08512"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.FileEarmarkText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Paper</span>
                </a>
                <a
                  className="bg-gray-200 hover:bg-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-slate-700 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md"
                  href="https://huggingface.co/datasets/bossemel/clever_birds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.Image className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Data</span>
                </a>
                <a
                  className="bg-gray-200 hover:bg-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-slate-700 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md"
                  href="https://github.com/visipedia/clever_birds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Code</span>
                </a>
                <a
                  className="bg-gray-200 hover:bg-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-slate-700 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md"
                  href="https://huggingface.co/bossemel/cleverbirds_models"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.Box className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Models</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 justify-center px-2 sm:px-4">
                <Image src="/uoe_logo.png" alt="University of Edinburgh" width={250} height={83} className="h-10 sm:h-12 md:h-14 w-auto" />
                <Image src="/cornell_logo.png" alt="Cornell University" width={250} height={83} className="h-10 sm:h-12 md:h-14 w-auto" />
                <Image src="/umass_logo.png" alt="UMass Amherst" width={250} height={83} className="h-10 sm:h-12 md:h-14 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen bg-gray-100 pt-8 sm:pt-12 md:pt-16 pb-8">
        <div className="max-w-[900px] px-4 sm:px-6 m-auto space-y-6">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-4">
              Fine-grained visual recognition skills are vital to many expert domains, yet understanding how humans acquire such expertise remains an open challenge. We introduce <a href="https://huggingface.co/datasets/bossemel/clever_birds" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline hover:text-slate-900"><b>CleverBirds</b></a>, a large-scale benchmark for knowledge tracing in fine-grained visual recognition. The dataset contains 17.9 million multiple-choice questions from 40,144 participants across 10,779 bird species, with an average of 444 questions per participant. This dataset was introduced in <i>CleverBirds: A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing</i>, to appear at NeurIPS 2025 (Datasets and Benchmarks track).
            </div>

            <div className="text-md font-regular text-slate-700 leading-relaxed">
              CleverBirds enables us to study how individuals learn to recognize fine-grained visual distinctions over time. We evaluate state-of-the-art knowledge tracing methods on this benchmark and find that tracking learner knowledge across participant subgroups and question types is challenging, with different forms of contextual information providing varying degrees of predictive benefit.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              We collected CleverBirds from the Photo and Sound Quiz of the <a href="https://ebird.org" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline hover:text-slate-900">eBird</a> citizen science platform. In this quiz, participants are shown a bird image and asked to identify the species from a list of options. They receive immediate feedback on the correct answer after each response. Quiz responses were collected from March 2018 to October 2024.
            </div>

            <div className="mt-6">
              <div className="w-full mb-4">
                <Image
                  src="/images/quiz_examples.png"
                  alt="Quiz Examples"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="text-sm text-slate-600 text-left mt-1">
                <b>Figure 1:</b> Three examples of quiz questions from CleverBirds. Each question has four species options plus a "None of the above" option. The correct answer is indicated in <span style={{ color: '#9ACD32' }}>green</span>. All five options are valid answers, and the candidate species differ for each question.
              </div>
            </div>


          </div>


          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              CleverBirds is one of the largest benchmarks for visual knowledge tracing, with substantially more learnable concepts than existing datasets. The dataset captures learning patterns across a diverse participant population, enabling us to study how expertise develops over time.
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 mb-6 max-w-3xl mx-auto">
              <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-center">
                <div className="text-base sm:text-lg md:text-xl font-bold text-slate-700">40,144</div>
                <div className="text-xs text-slate-600">Participants</div>
              </div>
              <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-center">
                <div className="text-base sm:text-lg md:text-xl font-bold text-slate-700">17,859,392</div>
                <div className="text-xs text-slate-600">Total Interactions</div>
              </div>
              <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-center">
                <div className="text-base sm:text-lg md:text-xl font-bold text-slate-700">10,779</div>
                <div className="text-xs text-slate-600">Bird Species</div>
              </div>
              <div className="bg-gray-100 p-2 sm:p-3 rounded-lg text-center">
                <div className="text-base sm:text-lg md:text-xl font-bold text-slate-700">444</div>
                <div className="text-xs text-slate-600">Avg Questions/User</div>
              </div>
            </div>

            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              Participants can choose which location they want to be quizzed on, and quiz locations are distributed globally.
            </div>

            <div className="mt-6 mb-6">
              <div className="w-full mb-4">
                <Image
                  src="/images/world_map.png"
                  alt="World Map"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="text-sm text-slate-600 text-left mt-1">
                <b>Figure 2:</b> World map showing quiz locations using Hex 3 polygonal bins, where color intensity encodes the number of interactions per location cell.
              </div>
            </div>

            {/* <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              We also observe that users are typically well engaged in the quiz, with more than half of our users answering more than 100 quiz questions, demonstrating long-range learning patterns.
            </div> */}

          </div>


          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              The knowledge tracing task requires predicting a participant's response given the current question and the correct answer. Models are provided with additional context such as the participant's interaction history and species information and have to infer the learner's evolving knowledge state to predict their guess.
            </div>

            <div className="mt-6 mb-6">
              <div className="w-full mb-4">
                <Image
                  src="/images/task_schema_colours.png"
                  alt="Task Schema"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="text-sm text-slate-600 text-left mt-1">
                <b>Figure 3:</b> <b>(Left) Human Learning</b>. Participants learn from CleverBirds quiz questions through repeated interactions. For each question, participants see a bird image and a list of possible species names, which may include the correct answer. After making a guess, they receive feedback with the correct answer. <b>(Right) Knowledge Tracing</b>. The prediction task: given a participant's interaction history, the current question's image, options, and correct answer, predict the participant's guess.
              </div>
            </div>

            {/* <div className="text-md font-regular text-slate-700 leading-relaxed mt-6">
              
              This history is then coupled with the current quiz question and passed to the model, which is tasked to predict the user's guess. By modeling participants' responses over time, we can track how their knowledge of different bird species evolves, identify which concepts are easier or harder to learn, and understand how contextual factors influence learning outcomes.
            </div> */}

          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              We evaluated a range of machine learning models and state-of-the-art knowledge tracing methods on CleverBirds. We found that tracking learner knowledge is challenging, especially when predicting incorrect choices, with different forms of contextual information providing varying degrees of predictive benefit.
            </div>

            <div className="mt-6 mb-6">
              <div className="w-full mb-4">
                <Image
                  src="/images/results.png"
                  alt="Results"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="text-sm text-slate-600 text-left mt-1">
                <b>Figure 4:</b> Performance on the multiple-choice and binary tasks. Top-left: accuracy on the full multiple-choice dataset. Top-right: accuracy on the subset of questions answered incorrectly. Bottom-left: macro-averaged accuracy on the binary task. Bottom-right: average precision (AP) for predicting user errors. Models are grouped by color into <span style={{ color: '#16a34a' }}>simple classifiers</span> (<i>RF</i> <span className="font-mono">U</span>, <i>RF</i> <span className="font-mono">S</span>, <i>RF</i> <span className="font-mono">U+S</span>), <span style={{ color: '#ff8c00' }}>MLPs</span> (<i>MLP</i> <span className="font-mono">U+S+Img</span>, <i>MLP</i> <span className="font-mono">Img</span>), <span style={{ color: '#dc2626' }}>KT models</span> (<i>LM MCC</i>, <i>LM Seq2seq</i>, <i>AKT</i><sup>1</sup>, <i>ATKT</i><sup>2</sup>, and <i>simpleKT</i><sup>3</sup>), and simple <span style={{ color: '#2563eb' }}>heuristics</span> (<i>Always Correct</i>, <i>Random binary</i>, <i>Random multiple-choice</i>, <i>Conf Prior</i>, <i>Conf Prior Inc</i>).
              </div>
            </div>

            <div className="text-md font-regular text-slate-700 leading-relaxed">
              We release this dataset to support the development and evaluation of new methods for visual knowledge tracing. CleverBirds is among the largest benchmarks of its kind, offering a substantially higher number of learnable concepts. With it, we hope to enable new avenues for studying the development of visual expertise over time and across individuals.
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 mb-4">
              If you found CleverBirds useful, please consider citing our work:
            </div>

            <div className="relative mt-4">
              <pre className="bg-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto pr-9 sm:pr-11">
                @inproceedings{"{"}bossemeyercleverbirds,
                <br />
                &nbsp;&nbsp;title={"{"}CleverBirds: A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing{"}"},
                <br />
                &nbsp;&nbsp;author={"{"}Bossemeyer, Leonie and Heinrich, Samuel and Van Horn, Grant and Mac Aodha, Oisin{"}"},
                <br />
                &nbsp;&nbsp;booktitle={"{"}The Thirty-ninth Annual Conference on Neural Information Processing Systems Datasets and Benchmarks Track{"}"}
                <br />
                {"}"}
              </pre>
              <button
                onClick={handleCopyCitation}
                className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-md bg-transparent hover:bg-gray-200/60 transition-all duration-150"
                title={copied ? "Copied!" : "Copy citation"}
              >
                {copied ? (
                  <Icons.Check2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                ) : (
                  <Icons.Clipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 hover:text-gray-700 transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-[10px] sm:text-xs text-slate-500">
              {/* <div className="mb-1 text-xs font-medium text-slate-600">Media Credits</div> */}
              <div className="text-[10px] sm:text-xs block leading-relaxed">
                We used the following recordings from <a href="https://www.birds.cornell.edu/" target="_blank" rel="noopener noreferrer" className="underline">Cornell Lab of Ornithology</a> | <a href="https://macaulaylibrary.org/" target="_blank" rel="noopener noreferrer" className="underline">Macaulay Library</a>:{' '}
                {[
                  ...birdImageIds.map((id) => `ML${id}`),
                  'ML614845753', 'ML624914011', 'ML624836085',
                  'ML615927847', 'ML621578731', 'ML617550217', 'ML621294128',
                  'ML39633601', 'ML50619491', 'ML38293181', 'ML226495281',
                  'ML30091521', 'ML117787821', 'ML302310521', 'ML83984151', 'ML141517111', 'ML284199291',
                  'ML51777001', 'ML26854421', 'ML301728521', 'ML290513131', 'ML50787721', 'ML174404171',
                  'ML463868861', 'ML613090562'
                ].map((mlId, index, array) => {
                  const id = mlId.replace('ML', '');
                  return (
                    <span key={mlId}>
                      <a href={`https://macaulaylibrary.org/asset/${id}`} target="_blank" rel="noopener noreferrer" className="underline">{mlId}</a>
                      {index < array.length - 1 && ', '}
                    </span>
                  );
                })}.
              </div>
              <div className="mt-3 text-[10px] sm:text-xs block leading-relaxed">
                Project page adapted from <a href="https://inquire-benchmark.github.io/" target="_blank" rel="noopener noreferrer" className="underline">INQUIRE: A Natural World Text-to-Image Retrieval Benchmark — Vendrow et al., NeurIPS 37 (2024)</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}