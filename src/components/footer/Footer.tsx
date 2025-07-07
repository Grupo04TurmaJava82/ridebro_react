import { FacebookLogo, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

function Footer() {
    const data = new Date().getFullYear();

    return (
        <div className="flex justify-center bg-gray-300 text-black">
            <div className="container flex flex-col items-center pt-6 pb-2">
                <p className='text-xl font-bold'>
                    <span className="text-black">Ride</span>
                    <span className="text-blue-500">Bro</span> | Copyright: {data}
                </p>

                <p className='text-lg mt-2'>Acesse nossas redes sociais</p>
                
                <div className='flex gap-4 mt-2'> 
                    <a href="https://github.com/Grupo04TurmaJava82" target='_blank' rel="noopener noreferrer">
                        <GithubLogo size={48} weight='bold' className="hover:text-blue-500 transition-colors" />
                    </a>
                    
                    {/* Adicione os links para as outras redes também */}
                    <a href="https://www.linkedin.com/feed/" target='_blank' rel="noopener noreferrer">
                      <LinkedinLogo size={48} weight='bold' className="hover:text-blue-500 transition-colors" />
                    </a>

                    <a href="/" target='_blank' rel="noopener noreferrer">
                      <FacebookLogo size={48} weight='bold' className="hover:text-blue-500 transition-colors" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;