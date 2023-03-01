import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import styles from '../styles/Home.module.css'
const inter = Inter({ subsets: ["latin"] });
const URL_API = "https://frontend-test-api-ten.vercel.app";

const headers = {};
export default function Home() {
  const [joke, setJoke] = useState({ id: "", content: "" });
  const [isModal, setIsModal] = useState(false);
  const fetchdata = async () => {
    try {
      const url = `${URL_API}/getJoke`;
      const res: any = await axios.get(url, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setJoke(res.data.data);
      }
    } catch (error) {}
  };
  const toggle = () => {
    setIsModal(!isModal);
  };
  const userVote = async (payload: string) => {
    try {
      const url = `${URL_API}/vote/${joke.id}`;
      const res = await axios.post(
        url,
        {
          payload,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (res.data.success) {
          setJoke(res.data.data);
        } else {
          toggle();
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleClickFunny = () => {
    userVote("funny");
  };
  const handleClickNotFunny = () => {
    userVote("notfunny");
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <header className="site-navbar js-sticky-header site-navbar-target">
        {/* <div className="container">
          <Image src="" alt="" width={40} height={40} />
          <div className="collapse navbar-collapse">

          </div>
        </div> */}
        <nav className="navbar navbar-expand navbar-light bg-white fixed-top">
          <div className={`container d-flex justify-content-between ${styles.container}`}>
            <div className="navbar-brand">
              <Image src="/images/logo.png" alt="" width={65} height={60} />
            </div>
            <div className="collapse navbar-collapse justify-content-end">
              <div className="d-flex gap-1">
                <div className="d-flex flex-column ">
                  <span style={{color: "#a3a3a3", fontStyle:'italic', fontSize:'0.9rem'}}>Handicrafted by</span>
                  <span>Jim HLS</span>
                </div>
                <div className="rounded-circle">
                  <img
                    src={"/images/avatar.png"}
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main
        className="pb-5"
        style={{ marginTop: "86px", borderBottom: "2px solid #e5e5e5" }}
      >
        <section className="" style={{ backgroundColor: "#29b363" }}>
          <div
            className={`container py-5 ${styles.container}`}
            style={{ backgroundColor: "#29b363" }}
          >
            <h1 className="text-white text-center" style={{ fontSize:'2rem', fontWeight:'400'}}>
              A joke a day keeps the doctor away
            </h1>
            <p className="text-white  text-center pt-1">
              If you joke wrong way, your teeth have to pay. (Serious)
            </p>
          </div>
        </section>
        <section
          className=""
          style={{ backgroundColor: "#fcfcfc", color: "#727272" }}
        >
          <div className={`container pt-5 ${styles.container}`} style={{}}>
            <p>{joke && joke.content}</p>
            <hr className="mt-5" style={{ maxWidth: "75%", margin: "auto" }} />
          </div>
        </section>
        <section className="" style={{ backgroundColor: "#fcfcfc" }}>
          <div
            className={`container pt-3 d-flex flex-wrap justify-content-center gap-4 ${styles.container}`}
            style={{}}
          >
            <button
              type="button"
              className="btn px-4 text-white"
              style={{
                backgroundColor: "#29b363",
                border: "none",
                borderRadius: "0px",
                minWidth: "170px",
                boxShadow: "0px 3px #19984e",
              }}
              onClick={handleClickFunny}
            >
              This is Funny!
            </button>
            <button
              type="button"
              className="btn px-4 text-white"
              style={{
                backgroundColor: "#2c7edb",
                border: "none",
                borderRadius: "0px",
                minWidth: "170px",
                boxShadow: "0px 3px #1c69c0",
              }}
              onClick={handleClickNotFunny}
            >
              This is not funny.
            </button>
          </div>
        </section>
      </main>

      <footer
        className="p-4 mb-1"
        style={{  color: "#a3a3a3" }}
      >
        <div className={`container ${styles.container} d-flex flex-column justify-content-center`}>
          <span className="text-center d-flex align-self-center" style={{ fontSize: "0.8rem" }}>
            This website is created as part of HIsolutions program. The
            materials contained on this website are provided for general
          </span>
          <span className="text-center d-flex align-self-center" style={{ fontSize: "0.8rem" }}>
          information only and do not constitute any form of advice. HLS
            assumes no responsibility for the accuracy of any particular
            statement and
          </span>
          <span className="text-center d-flex align-self-center" style={{ fontSize: "0.8rem" }}>
          accepts no liability for any loss or damage which may
            arise from reliance on the information contained on this site.
          </span>
          <div className="text-center text-black mt-1">Copyright 2021 HLS</div>
        </div>
      </footer>
      <Modal isOpen={isModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Message</ModalHeader>
        <ModalBody>
          That's all the jokes for today! Come back another day!
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
