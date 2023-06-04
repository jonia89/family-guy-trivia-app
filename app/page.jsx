/**

Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCharacters } from '@/lib/characters'



export default async function Page() {
  const data = await getAllCharacters()
  return (
    <main className="flex items-center justify-center h-screen">
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cold-4">
        {data?.characters?.map(character => {
          return (
            <Link
              href={`/characters/${character.slug}`}
              key={character.name}
              className="overflow-hidden rounded-md"
            >
              <Image
                src={character.avatar}
                alt=""
                className="transition-all duration-500 hover:scale-110 hover:-rotate-2"
                width={500}
                height={500}
              />
            </Link>
          )
        })}
      </Container>
    </main>
  )
}
