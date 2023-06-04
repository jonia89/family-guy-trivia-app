/**
Renders a Next.js page component that displays detailed information about a character, including their name, occupations, description, images, skills, and famous quotes.
@component
@param {Object} props - The component props.
@param {Object} props.params - The parameters passed to the page component.
@param {string} props.params.slug - The slug of the character.
@returns {JSX.Element} The rendered page component.
*/
import { getAllCharacters } from '@/lib/characters'
import { Container } from '@/components'
import Image from 'next/image'
import { endpoint } from '@/utils/endpoint'

export const dynamicParams = false

export async function generateStaticParams() {
  const { characters } = await getAllCharacters()
  return characters.map(character => ({ slug: character.slug }))
}

export async function getCharacterBySlug(slug) {
  const data = await fetch(`${endpoint}/characters/${slug}`)

  if (!data.ok) {
    throw new Error('Failed to fetch character')
  }
  return data.json()
}

export default async function Page({ params }) {
  const { character, character_quotes } = await getCharacterBySlug(params.slug)
  return (
    <Container className="flex flex-col gap-5 py-5" as="main">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{character.name}</h1>
        <ul className="flex gap-1 text-sm">
          {character.occupations.map(item => {
            return (
              <li
                key={item}
                className="p-2 text-gray-300 bg-gray-800 rounded-md"
              >
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      <p className="text-sm leading-6">{character.description}</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {character.images.map(image => {
          return (
            <li
              key={image}
              className="relative flex overflow-hidden bg-gray-900 rounded-xl"
            >
              <Image
                className="transition-all duration-500 hover:scale-110 hover:rotate-2"
                src={image}
                alt=""
                width={760}
                height={435}
              />
            </li>
          )
        })}
      </ul>
      {character.skills && (
        <>
          <h2 className="text-xl font-bold">Voimat ja taidot</h2>
          <ul className="flex flex-wrap gap-1">
            {character.skills.map(item => {
              return (
                <li
                  className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950"
                  key={item}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </>
      )}
      {character_quotes && (
        <>
          <h2 className="text-xl font-bold">Tunnetuimmat lausahdukset</h2>
          <ul className="grid gap-5">
            {character_quotes.map((item, idx) => {
              return (
                <li
                  className="p-2 italic text-gray-400 border-1-4 border-green-400 rounded-md"
                  key={item.idx}
                >
                  {item.quote}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </Container>
  )
}
