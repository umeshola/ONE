import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row justify-between px-32 mt-32">
            <div className="md:w-1/2 mr-24 bg-slate-800 p-8 rounded-lg shadow-md mb-8 md:mb-0">
                <h2 className="text-3xl flex justify-center font-bold mb-4">Body Health</h2>
                <p className="mb-4 text-xl text-green-100">
                    Maintaining a healthy body is essential for overall well-being. Check out these resources for tips and advice on physical health:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <a
                            target="_blank"
                            href="https://www.diabetesaustralia.com.au/recipes/?utm_term=healthy%20meals&utm_campaign=Resources+-+G.Ads&utm_source=adwords&utm_medium=ppc&hsa_acc=8502045261&hsa_cam=16008748441&hsa_grp=136322031767&hsa_ad=576973225645&hsa_src=g&hsa_tgt=kwd-23770953&hsa_kw=healthy%20meals&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHKXTOAcBoBuRVT_hmXk4DTiBx2oKS8oh2s45cYUUm2zmyU1vhoXDYwaArqTEALw_wcB"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            diet plans
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://quiz.betterme.world/en/first-page-generated-gender?flow=1442&utm_source=google&utm_medium=cpc&utm_campaign=search_recurring_f1442_cid21098541966/290&utm_content=693875144831&utm_term=best%20diet%20plan&gad_source=1&gclid=Cj0KCQjw0MexBhD3ARIsAEI3WHKGcLyxVHP4EiETjIw1NXAaFp1AwvANjAH5s9Y3btFpHy4K3VseaFIaAni5EALw_wcB"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            exercise plan
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=hHHB00Nu3Ak"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            10-Minute Full Body Workout Video
                        </a>
                    </li>
                </ul>
            </div>
            <div className="md:w-1/2 bg-slate-800 p-8 rounded-lg shadow-md">
                <h2 className="flex justify-center  font-bold text-3xl mb-4">Mental Health</h2>
                <p className="mb-4 text-xl text-green-100">
                    Taking care of your mental health is just as important as your physical health. Explore these resources for support and guidance:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=f3r1mK_MuLU&t=10s"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            kriya yoga
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=up6NRP3cj4Y"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            meditation
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://www.verywellmind.com/best-books-on-meditation-4160661"
                            className="text-blue-500 text-xl hover:text-blue-700"
                        >
                            books
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
