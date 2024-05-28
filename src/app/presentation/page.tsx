import Head from 'next/head';
import Header from "../header"

const Presentation = () => {
    return (
        <>
            <Head>
                <title>À Propos de Turkint</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
                    integrity="sha512-yRtwGEnB88bthzzS9NqA3YJt4iwF5KbbfWcfbWwGkPU+aYJYdFWfQ+GHiZt4upqk+s4bZ5KL5X1JJlm+ktq2w=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <style>{`
                    .background-image {
                        background-image: url('/etoile.webp');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }

                    .nav-link {
                        color: black;
                        transition: color 0.5s ease, transform 0.5s ease;
                    }

                    .nav-link:hover {
                        color: white;
                        transform: scale(1.1);
                    }

                    .btn {
                        background-color: white;
                        color: #e3342f;
                        padding: 0.5rem 1rem;
                        border-radius: 0.25rem;
                        text-align: center;
                        font-weight: bold;
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }

                    .btn:hover {
                        background-color: #f8f8f8;
                        transform: scale(1.1);
                    }
                    
                    @keyframes rotating {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                    .rotating {
                        animation: rotating 2s linear infinite;
                    }
                `}</style>
            </Head>
            
            <div className="background-image">
                <Header />

                <main className="container mx-auto py-16 px-4 flex-grow my-20">
                    <section id="projet" className="bg-white rounded-lg p-8 shadow-lg mb-24">
                        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Pourquoi ce projet?</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mt-10 text-center">
                            Le projet Turkint est né de notre passion pour la cuisine, en particulier pour les kebabs, et de notre désir de rendre la commande de kebabs aussi simple et agréable que leur dégustation, et peu chère pour les étudiants de l'INT. Avec la popularité croissante des services de livraison de repas, nous avons vu une opportunité de créer une plateforme dédiée exclusivement aux kebabs, offrant une expérience utilisateur unique et conviviale qui permettra au plus grand nombre d'en profiter.
                        </p>
                    </section>

                    <section id="equipe" className="bg-white rounded-lg p-8 shadow-lg mb-24">
                        <h2 className="text-3xl font-bold text-red-600 mb-9 text-center">Les Membres de l'Équipe</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <div className="text-center mb-12">
                                <img src="/Victor.webp" alt="Victor" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">Victor Maitre Kebabier</h3>
                                <p className="text-gray-700">"Je suis passionné par les kebabs et j'aime partager cette passion avec tous. MONSTRE"</p>
                            </div>
                            <div className="text-center mb-12">
                                <img src="/Eliot.webp" alt="Eliot" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">Eliot Maitre Kebabier</h3>
                                <p className="text-gray-700">"Les kebabs sont plus qu'un repas, c'est une expérience."</p>
                            </div>
                            <div className="text-center mb-12">
                                <img src="/florian.webp" alt="Membre 3" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">Flo Maitre Kebabier</h3>
                                <p className="text-gray-700">"La qualité et le goût sont mes priorités."</p>
                            </div>
                            <div className="text-center">
                                <img src="/PJ.webp" alt="Membre 4" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">PJ Maitre Kebabier</h3>
                                <p className="text-gray-700">"Double MONSTRE"</p>
                            </div>
                            <div className="text-center">
                                <img src="/nico.webp" alt="Membre 5" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">Nico Maitre Kebabier</h3>
                                <p className="text-gray-700">"Partager un kebab, c'est partager un moment de bonheur."</p>
                            </div>
                            <div className="text-center">
                                <img src="/aloys.jpg" alt="Membre 6" className="team-photo w-36 h-36 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-900">Aloys Maitre Kebabier</h3>
                                <p className="text-gray-700">"Rien ne vaut un bon kebab après une longue journée."</p>
                            </div>
                        </div>
                    </section>

                    <section id="objectifs" className="bg-white rounded-lg p-8 shadow-lg mb-24">
                        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Nos Objectifs</h2>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed text-lg mt-10 text-center">
                            <li>Assurer la livraison rapide et fiable des commandes.</li>
                            <li>Fournir une plateforme intuitive et facile à utiliser pour commander des kebabs.</li>
                            <li>Collaborer avec les meilleurs restaurants de kebabs pour garantir la qualité des repas.</li>
                            <li>Améliorer continuellement l'expérience utilisateur grâce aux retours des clients.</li>
                        </ul>
                    </section>

                    <section id="contact" className="bg-white rounded-lg p-8 shadow-lg mb-4">
                        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Contactez-nous</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mt-10 text-center">
                            Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter à l'adresse suivante : <a href="mailto:contact@turkint.com" className="text-blue-500">contact@turkint.com</a>
                        </p>
                    </section>
                </main>

                <footer className="bg-red-600 shadow mt-2 w-full">
                    <div className="container mx-auto py-4 px-4 text-center">
                        <p className="text-gray-100">&copy; 2024 Turkint. Tous droits réservés.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Presentation;
