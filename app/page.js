'use client';

import Image from "next/image";
import * as Icons from "react-bootstrap-icons";

export default function Home() {

  // Bird image asset IDs for the grid backdrop (80 images: 8 rows × 10 columns)
  const birdImages = [
    '116049931', '151561221', '119087321', '92749501', '573697681', '160571121', '537341591', '102836251', '615966434', '612007611',
    '558146061', '547612131', '619622154', '614031554', '601480841', '191838061', '175066671', '178092791', '89210001', '101165001',
    '608937156', '560669831', '615525025', '300360751', '79145831', '586246051', '66677101', '79321301', '46165631', '422231291',
    '620875620', '586481701', '166040121', '68277481', '221405381', '113700001', '246875981', '564023871', '168160141', '86648961',
    '129001491', '165370941', '48680621', '235493731', '146864981', '610451060', '614371301', '69662191', '589092841', '211835021',
    '88531421', '529660791', '357819031', '565126211', '586608881', '406173031', '614548846', '621045037', '551526071', '61383711',
    '614584584', '151172591', '26554101', '186111231', '544108441', '179573301', '611978626', '89447031', '102726651', '134292171',
    '142874561', '160575501', '173863411', '220455911', '242918501', '289306081', '327232121', '428128071', '534053971', '594375981'
  ];

  return (
    <div className="min-w-[720px]">
      <div className="relative flex justify-center w-full h-screen overflow-hidden bg-slate-50">
        {/* Grid backdrop */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 gap-2 p-4">
          {birdImages.map((assetId) => (
            <div key={assetId} className="relative w-full h-full min-h-0">
              <Image
                src={`/images/bird_grid/${assetId}.jpg`}
                alt={`Bird ${assetId}`}
                fill
                className="object-cover rounded-sm opacity-80"
                sizes="(max-width: 768px) 10vw, 10vw"
              />
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative w-full max-w-[960px] m-auto mx-4 z-10">
          <div className="bg-white w-full py-8 px-12 rounded-3xl">
            <div className="text-[80px] font-medium flex items-center">
              CleverBirds
            </div>
            <div className="mt-2 text-3xl font-regular mb-8 text-slate-700">
              A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing
            </div>
            <div className="mb-2 text-xl -mt-2">
              <span className="mr-5"><a href="https://bossemel.github.io/" className="text-blue-600 hover:text-blue-800">Leonie Bossemeyer</a></span><span className="mr-5"><a href="https://www.birds.cornell.edu/home/staff/sam-heinrich/" className="text-blue-600 hover:text-blue-800">Samuel Heinrich</a></span><span className="mr-5"><a href="https://gvh.codes/" className="text-blue-600 hover:text-blue-800">Grant Van Horn</a></span><a href="https://homepages.inf.ed.ac.uk/omacaod/" className="text-blue-600 hover:text-blue-800">Oisin Mac Aodha</a>
            </div>
            <div className="mt-8">
              <div>
                <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="https://neurips.cc/virtual/2025/loc/san-diego/poster/121851" target="_blank" rel="noopener noreferrer">
                  <Icons.FileEarmarkText className="w-4 h-4 inline mr-2" />
                  Paper
                </a>
                <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="https://huggingface.co/datasets/bossemel/clever_birds" target="_blank" rel="noopener noreferrer">
                  <Icons.Image className="w-4 h-4 inline mr-2" />
                  Data
                </a>
                <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="https://huggingface.co/bossemel/cleverbirds_models" target="_blank" rel="noopener noreferrer">
                  <Icons.Box className="w-4 h-4 inline mr-2" />
                  Models
                </a>
                <a className="bg-slate-600 rounded-full px-4 py-1 text-white inline-flex items-center h-8 text-sm mr-2" href="#" rel="noopener noreferrer">
                  <Icons.Github className="w-4 h-4 inline mr-2" />
                  Code
                </a>
              </div>
              <div className="flex items-center gap-5 mt-4 justify-end">
                <Image src="/uoe_logo.png" alt="University of Edinburgh" width={250} height={83} className="h-16 w-auto" />
                <Image src="/cornell_logo.png" alt="Cornell University" width={250} height={83} className="h-16 w-auto" />
                <Image src="/umass_logo.png" alt="UMass Amherst" width={250} height={83} className="h-16 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen bg-white pt-16 pb-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="mt-8 text-md font-regular  mb-8 text-slate-700">
            {/* <b>Abstract</b> */}
            <br /><br />

            Fine-grained visual recognition, essential in many expert domains, often requires specialists years of dedicated training. Modeling the progression of such expertise remains challenging, and accurately inferring a learner's knowledge state is a key step toward understanding visual learning. We introduce <b>CleverBirds</b>, a large-scale knowledge tracing benchmark for fine-grained bird recognition. Collected by the citizen-science platform eBird, it offers insight into how individuals acquire expertise in complex fine-grained classification tasks. More than 40,000 participants have engaged in the quiz, answering over 17 million multiple-choice questions spanning 10,000+ bird species, with long-range learning patterns across an average of 400+ questions per participant. We release this dataset to support the development and evaluation of new methods for visual knowledge tracing. We show that tracking learners' knowledge is challenging, especially across participant subgroups and question types, with different forms of contextual information offering varying degrees of predictive benefit. CleverBirds is among the largest benchmarks of its kind, offering a substantially higher number of learnable concepts. With it, we hope to enable new avenues for studying the development of visual expertise over time and across individuals. <br /><br />
          </div>

          <div className="mt-8 mb-8">
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
            <div className="text-sm text-slate-600 text-center italic mt-2">
              <b>(Left) Human Learning</b>. Participants learn from the quiz questions contained in CleverBirds through repeated interactions. For each question, participants are presented with an image of a bird species and a list of possible species names (here {'{'}A', 'B', 'C', 'D'{'}'}), which may include the correct answer. After making a guess, they receive feedback in the form of the correct answer (here 'A'). This process is repeated for multiple questions.
              <br /><br />
              <b>(Right) Knowledge Tracing</b>. We illustrate the prediction task, in which a model is given a participant's interaction history together with the current question's image, options, and correct answer, and is tasked with predicting the participant's guess.
            </div>
          </div>

          <div className="mt-8 mb-8">
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
            <div className="text-sm text-slate-600 text-center italic mt-2">
              World map with Hex 3 polygonal bins representing quiz locations, where color intensity encodes the number of interactions per location cell.
            </div>
          </div>

          <div className="mt-8 mb-8">
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
            <div className="text-sm text-slate-600 text-center italic mt-2">
              Three examples of the types of quiz questions found in our CleverBirds dataset. In each case, there are four options representing different species and an additional "None of the above" option. The correct answer is indicated in <span style={{ color: '#9ACD32' }}>green</span>. Any of five options are valid answers and the set of candidate species provided in the option set are different for each question.
            </div>
          </div>

          <div className="mt-8 mb-8">
            <div className="w-full mb-4">
              <Image
                src="/images/confused_pairs.png"
                alt="Confused Species Pairs"
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="text-sm text-slate-600 text-center italic mt-2">
              Top-5 most frequently confused species pairs for species with {'>'} 1,000 interactions. From top-to-bottom and left-to-right: American Crow vs Fish Crow, Pin-tailed Snipe vs Common Snipe, Redpoll (Hoary) vs Redpoll (Common), Ross's Goose vs Snow Goose, Sharp-shinned Hawk vs Cooper's Hawk, and Short-tailed Shearwater vs Sooty Shearwater. Images taken from eBird.
            </div>
          </div>

        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Dataset Statistics
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">40,144</div>
              <div className="text-sm text-slate-600">Participants</div>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">17,859,392</div>
              <div className="text-sm text-slate-600">Total Interactions</div>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">10,779</div>
              <div className="text-sm text-slate-600">Bird Species</div>
            </div>
            <div className="bg-slate-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">444</div>
              <div className="text-sm text-slate-600">Avg Questions/User</div>
            </div>
          </div>
          <div className="text-center text-slate-700">
            CleverBirds contains data from over 40,000 unique participants answering over 17 million multiple-choice questions spanning 10,000+ bird species, with long-range learning patterns across an average of 400+ questions per participant.
          </div>

          <div className="mt-8 mb-8">
            <div className="w-full mb-4">
              <Image
                src="/images/data_eda.png"
                alt="Data Exploratory Analysis"
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="text-sm text-slate-600 text-center italic mt-2">
              Left to right: Cumulative distribution of quizzes attempted per user on a log scale, distribution of users' average accuracies, distribution of species-wise average user accuracies, and average user accuracy by number of prior exposures to a species.
            </div>
          </div>

          <div className="mt-8 mb-8">
            <div className="w-full mb-4 flex gap-4">
              <div className="flex-1" style={{ flex: '0.51' }}>
                <Image
                  src="/images/ebirds_quiz-quality_comp.png"
                  alt="Quality Comparison"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex-1" style={{ flex: '0.47' }}>
                <Image
                  src="/images/quality_analysis_panels.png"
                  alt="Quality Analysis"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="text-sm text-slate-600 text-center italic mt-2">
              <b>(Left)</b> Here we compare lower quality quiz images (upper row) to high quality ones obtained from eBird species' pages (bottom row). Quiz questions may contain images that show birds from a distance, partially obscured, or uncommon angles. Species from left to right: Bufflehead, California Towhee, Dark-eyed Junco, and Blue-gray Gnatcatcher.
              <br /><br />
              <b>(Right)</b> Here we show the average accuracy of users for each possible quality rating. We observe that on average that higher quality images are easier for users.
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
            @article{"{"}bossemeyer2025cleverbirds,
            <br />
            &nbsp;&nbsp;title={"{"}CleverBirds: A Multiple-Choice Benchmark for Fine-grained Human Knowledge Tracing{"}"},
            <br />
            &nbsp;&nbsp;author={"{"}Bossemeyer, Leonie and Heinrich, Samuel and Van Horn, Grant and Mac Aodha, Oisin{"}"},
            <br />
            &nbsp;&nbsp;journal={"{"}arXiv preprint{"}"},
            <br />
            &nbsp;&nbsp;year={"{"}2025{"}"},
            <br />
            {"}"}
          </pre>
        </div>
      </div>

      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Media Credits
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="text-sm text-slate-700">
            We used the following recordings from Cornell Lab of Ornithology | Macaulay Library:
            <br /><br />
            {[
              ...birdImages.map((id) => `ML${id}`),
              'ML614845753', 'ML624914011', 'ML624836085',
              'ML615927847', 'ML621578731', 'ML617550217', 'ML621294128',
              'ML39633601', 'ML50619491', 'ML38293181', 'ML226495281',
              'ML30091521', 'ML117787821', 'ML302310521', 'ML83984151', 'ML141517111', 'ML284199291',
              'ML51777001', 'ML26854421', 'ML301728521', 'ML290513131', 'ML50787721', 'ML174404171',
              'ML463868861', 'ML613090562'
            ].join(', ')}.
          </div>
        </div>
      </div>
    </div>
  );
}