import 'regenerator-runtime/runtime'
import Image from 'next/image';
import styles from './page.module.css';
import dynamic from "next/dynamic";
import Link from "next/link";
const Voice = dynamic(() => import("@/components/voice"), {ssr: false})
import Upload from "@/components/upload";


export default function Home() {
    return (
        <main>
            <h1>Transit Tech</h1>
            <Voice/>

            <h1>
                Text To Speech
            </h1>


            <Upload/>

        </main>
    );
}
