import 'regenerator-runtime/runtime';
import Image from 'next/image';
import styles from './page.module.css';

import ChatBody from "@/components/chatBody";
import WorldMap from "@/components/worldMap";

export default function Home() {

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Transit Tech</h1>
            {/*<WorldMap latitude={34.052490234375} longitude={-118.24370574951172} />*/}


            <ChatBody/>
        </main>
    );
}
