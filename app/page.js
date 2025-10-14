'use client';

import Image from "next/image";
import * as Icons from "react-bootstrap-icons";

export default function Home() {

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
              <a href="https://bossemel.github.io/" className="text-slate-700 hover:text-slate-900">Leonie Bossemeyer</a><sup>1</sup> <a href="https://www.birds.cornell.edu/home/staff/sam-heinrich/" className="text-slate-700 hover:text-slate-900">Samuel Heinrich</a><sup>2</sup> <a href="https://gvh.codes/" className="text-slate-700 hover:text-slate-900">Grant Van Horn</a><sup>3</sup> <a href="https://homepages.inf.ed.ac.uk/omacaod/" className="text-slate-700 hover:text-slate-900">Oisin Mac Aodha</a><sup>1</sup>
            </div>
            <div>
              <sup>1</sup>University of Edinburgh <sup>2</sup>Cornell University <sup>3</sup>UMass Amherst
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
            <b>Abstract</b>
            <br /><br />

            Fine-grained visual recognition, essential in many expert domains, often requires specialists years of dedicated training. Modeling the progression of such expertise remains challenging, and accurately inferring a learner's knowledge state is a key step toward understanding visual learning. We introduce <b>CleverBirds</b>, a large-scale knowledge tracing benchmark for fine-grained bird recognition. Collected by the citizen-science platform eBird, it offers insight into how individuals acquire expertise in complex fine-grained classification tasks. More than 40,000 participants have engaged in the quiz, answering over 17 million multiple-choice questions spanning 10,000+ bird species, with long-range learning patterns across an average of 400+ questions per participant. We release this dataset to support the development and evaluation of new methods for visual knowledge tracing. We show that tracking learners' knowledge is challenging, especially across participant subgroups and question types, with different forms of contextual information offering varying degrees of predictive benefit. CleverBirds is among the largest benchmarks of its kind, offering a substantially higher number of learnable concepts. With it, we hope to enable new avenues for studying the development of visual expertise over time and across individuals.
          </div>

          <div className="mt-8 mb-8">
            <Image
              src="/images/task_schema.png"
              alt="Task Schema"
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-sm"
              style={{ objectFit: 'contain' }}
            />
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
        </div>
      </div>


      <div className="py-1 bg-slate-100 text-[40px] font-medium flex items-center justify-center text-center">
        Key Findings
      </div>
      <div className="w-full bg-white py-8">
        <div className="max-w-[900px] px-6 m-auto">
          <div className="space-y-6">
            <div className="border border-slate-200 p-6 rounded-lg bg-slate-50">
              <div className="text-xl font-bold text-slate-700 mb-2">User Context is More Informative</div>
              <div className="text-slate-600">
                Models receiving both user and species context perform best overall, with models receiving only user context close behind. User-specific context appears necessary for strong predictions.
              </div>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg bg-slate-50">
              <div className="text-xl font-bold text-slate-700 mb-2">Predicting Incorrect Choices is Challenging</div>
              <div className="text-slate-600">
                While supervised models achieve approximately 70% accuracy on the multiple-choice task, all trained models achieve less than 10% accuracy on questions where participants choose the wrong answer.
              </div>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg bg-slate-50">
              <div className="text-xl font-bold text-slate-700 mb-2">Image Features Complement Context</div>
              <div className="text-slate-600">
                Image features help knowledge tracing for CleverBirds, but only when combined with the right context. On incorrectly answered questions, models with image features significantly outperform others.
              </div>
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
    </div>
  );
}