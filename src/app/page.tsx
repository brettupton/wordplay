import { WordCloud } from '@/components'
import Image from 'next/image'

export default function Home() {
    const routes = ['frequency', 'markov', 'n-gram', 'phonetics', 'tags']

    return (
        <WordCloud centerImage={
            <Image
                className='bg-black'
                id='logo'
                src="/images/wordplay.png"
                height={400}
                width={200}
                style={{ width: 'auto', height: 'auto' }}
                alt='Wordplay Logo'
                priority={true} />
        }
            words={routes}
        />
    )
}