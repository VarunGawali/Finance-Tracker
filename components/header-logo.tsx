import Link from "next/link"
import Image from "next/image"

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" alt="Logo" height={69} width={69}/>
        <p className="font-semibold text-white text-2xl ml-2.5">Finance tracker</p>
      </div>
    </Link>
  )
}

export default HeaderLogo
