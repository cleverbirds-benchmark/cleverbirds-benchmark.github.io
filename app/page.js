'use client';

import Image from "next/image";
import * as Icons from "react-bootstrap-icons";

export default function Home() {
  // Bird image asset IDs used in the backdrop image
  const birdImageIds = [
    '573697681', '428128071', '88531421', '211835021', '610451060', '547612131', '564023871', '116768801', '61383711', '316745031',
    '246875981', '92749501', '79321301', '614371301', '289306081', '614584584', '586246051', '300360751', '608835731', '178092791',
    '422231291', '612007611', '117594561', '27999251', '179573301', '611679955', '46165631', '551526071', '101165001', '134292171',
    '168160141', '450270361', '26554101', '610427401', '89210001', '537341591', '165370941', '614031554', '586608881', '586481701',
    '544108441', '235493731', '186111231', '560669831', '69662191', '406173031', '215047171', '327232121', '146864981', '160575501',
    '119087321', '68277481', '102836251', '166040121', '167374331', '92172161', '220455911', '116049931', '142874561', '602284521',
    '66677101', '230656561', '102726651', '585337501', '608937156', '284964471', '48680621', '191838061', '565126211', '160571121',
    '589092841', '620875620', '113700001', '357819031', '558146061', '615966434', '221405381', '175066671', '606431381', '173863411'
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
                  href="https://neurips.cc/virtual/2025/loc/san-diego/poster/121851"
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
                  className="bg-gray-100 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-slate-400 inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium shadow-sm cursor-not-allowed opacity-60"
                  href="#"
                  onClick={(e) => e.preventDefault()}
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
              Fine-grained visual recognition skills are vital to many expert domains, yet understanding how humans acquire such expertise remains an open challenge. We introduce <b>CleverBirds</b>, a large-scale benchmark for knowledge tracing in fine-grained visual recognition. The dataset contains 17.9 million multiple-choice questions from 40,144 participants across 10,779 bird species, with an average of 444 questions per participant.
            </div>

            <div className="text-md font-regular text-slate-700 leading-relaxed">
              CleverBirds enables us to study how individuals learn to recognize fine-grained visual distinctions over time. We evaluate state-of-the-art knowledge tracing methods on this benchmark and find that tracking learner knowledge across participant subgroups and question types is challenging, with different forms of contextual information providing varying degrees of predictive benefit.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="text-md font-regular text-slate-700 leading-relaxed mb-6">
              We collected CleverBirds from the Photo and Sound Quiz feature of the eBird citizen science platform. In this quiz, participants are shown a bird image and asked to identify the species from a list of options. They receive immediate feedback on the correct answer after each response. Quiz responses were collected from March 2018 to October 2024.
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
              Participants can choose which location they want to be quizzed on, and quiz locations are distributed globally, as shown below.
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
              The knowledge tracing task requires predicting a participant's response given their interaction history, the current question image, candidate species options, and the correct answer. Models are provided with the participant's past responses and have to infer their evolving knowledge state to predict their guess.
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
              We evaluated state-of-the-art knowledge tracing methods on CleverBirds, including both binary classification and multiple-choice prediction tasks. We found that tracking learner knowledge is challenging, especially across participant subgroups and question types, with different forms of contextual information providing varying degrees of predictive benefit.
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
                <b>Figure 4:</b> Model performance comparison showing binary classification and multiple-choice prediction results with error bars.
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

            <pre className="mt-4 bg-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
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
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-[10px] sm:text-xs text-slate-500">
              {/* <div className="mb-1 text-xs font-medium text-slate-600">Media Credits</div> */}
              <div className="text-[10px] sm:text-xs block leading-relaxed">
                We used the following recordings from Cornell Lab of Ornithology | Macaulay Library:{' '}
                {[
                  ...birdImageIds.map((id) => `ML${id}`),
                  'ML614845753', 'ML624914011', 'ML624836085',
                  'ML615927847', 'ML621578731', 'ML617550217', 'ML621294128',
                  'ML39633601', 'ML50619491', 'ML38293181', 'ML226495281',
                  'ML30091521', 'ML117787821', 'ML302310521', 'ML83984151', 'ML141517111', 'ML284199291',
                  'ML51777001', 'ML26854421', 'ML301728521', 'ML290513131', 'ML50787721', 'ML174404171',
                  'ML463868861', 'ML613090562'
                ].join(', ')}.
              </div>
              <div className="mt-3 text-[10px] sm:text-xs block leading-relaxed">
                Project page adapted from INQUIRE: A Natural World Text-to-Image Retrieval Benchmark — Vendrow et al., NeurIPS 37 (2024).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}