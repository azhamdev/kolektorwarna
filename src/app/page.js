import { ColorCard } from '@/components/ColorCard';
import { ColorInput } from '@/components/ColorInput';


async function getColors() {
  const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='azham@yahoo.com')", { cache: "no-store" })
  const data = await res.json()
  return data;
}

export default async function Page() {
  const { items } = await getColors()


  return (
    <div className='bg-black space-y-10 py-10'>

      <header className='text-center space-y-3'>
        <h1 className='text-6xl font-semibold text-indigo-500'>Save Your Favorite Color</h1>
        <p className='text-zinc-300 font-light text-sm'>remember the color you will use for your project someday</p>
      </header>

      <main >
        <ColorInput />
        <div className='p-4 grid grid-cols-2 lg:grid-cols-4 gap-1'>
          {items.map(({ id, content }) => {
            return (
              <ColorCard key={id} id={id} content={content} />
            )
          })}
        </div >
      </main >

      <footer className='text-center text-white text-sm p-4'>
        Made with ❤️ by A'zham A. Rasyid
      </footer>
    </div>
  )
}
