import { useRouter } from "next/router";
import Link from "next/link";

const NavLink = ({ text, link }) => {
  const router = useRouter();
  const page = router.pathname;

  let className = `nav-link`;
  `/${link}` === `/${page}` ? (className += ` --active`) : "";

  return (
    <div className={className}>
      <Link href={`${link}`}>{text}</Link>
    </div>
  );
};

export default NavLink;
