import { Header } from './component/header';
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
    </main>
  )
}
