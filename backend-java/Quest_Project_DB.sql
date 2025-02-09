--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: quest_model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_model (
    id uuid NOT NULL,
    amount_of_questions integer NOT NULL,
    description character varying(255),
    name character varying(255),
    rating integer NOT NULL,
    time_limit integer NOT NULL,
    owner_id uuid
);


ALTER TABLE public.quest_model OWNER TO postgres;

--
-- Name: quest_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quest_task (
    id uuid NOT NULL,
    photo_for_task character varying(255),
    video_for_task character varying(255),
    answer_variation1 character varying(255),
    answer_variation2 character varying(255),
    answer_variation3 character varying(255),
    answer_variation4 character varying(255),
    place_in_quest_queue integer NOT NULL,
    task_description character varying(255),
    text_for_task character varying(255),
    quest_id uuid
);


ALTER TABLE public.quest_task OWNER TO postgres;



--
-- Name: user_ongoing_quests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_ongoing_quests (
    user_id uuid NOT NULL,
    quest_id uuid NOT NULL,
    starttime timestamp DEFAULT CURRENT_TIMESTAMP,
    finishtime timestamp
);


ALTER TABLE public.user_ongoing_quests OWNER TO postgres;


--
-- Name: user_ongoing_tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_ongoing_tasks (
    user_id uuid NOT NULL,
    quest_id uuid NOT NULL,
    task_id uuid NOT NULL,
    user_answer character varying(255)
);


ALTER TABLE public.user_ongoing_tasks OWNER TO postgres;


--
-- Name: user_completed_quests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_completed_quests (
    user_id uuid NOT NULL,
    quest_id uuid NOT NULL
);


ALTER TABLE public.user_completed_quests OWNER TO postgres;

--
-- Name: user_model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_model (
    id uuid NOT NULL,
    avatar character varying(255),
    created_quests_rating integer NOT NULL,
    email character varying(255),
    password character varying(255),
    profile_picture character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.user_model OWNER TO postgres;

--
-- Data for Name: quest_model; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quest_model (id, amount_of_questions, description, name, rating, time_limit, owner_id) FROM stdin;
\.


--
-- Data for Name: quest_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quest_task (id, photo_for_task, video_for_task, answer_variation1, answer_variation2, answer_variation3, answer_variation4, place_in_quest_queue, task_description, text_for_task, quest_id) FROM stdin;
\.


--
-- Data for Name: user_completed_quests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_completed_quests (user_id, quest_id) FROM stdin;
\.


--
-- Data for Name: user_model; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_model (id, avatar, created_quests_rating, email, password, profile_picture, user_name) FROM stdin;
c0939c16-7b6a-477d-9f99-3ab8260c5c24	\N	0	matlirioiii@gmail.com	$2a$10$Djl5znBlDpDj6U.pPpETg.Hr682UQdKTO7pZ.hsZGsoZ6rhqZgp1.	\N	\N
\.


--
-- Name: quest_model quest_model_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_model
    ADD CONSTRAINT quest_model_pkey PRIMARY KEY (id);


--
-- Name: quest_task quest_task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_task
    ADD CONSTRAINT quest_task_pkey PRIMARY KEY (id);


--
-- Name: user_model user_model_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_model
    ADD CONSTRAINT user_model_pkey PRIMARY KEY (id);


 --
-- Name: user_ongoing_tasks fk_user_ongoing_tasks_quest_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_ongoing_tasks
    ADD CONSTRAINT fk_user_ongoing_tasks_quest_id FOREIGN KEY (quest_id) REFERENCES public.quest_model(id);

 --
-- Name: user_ongoing_tasks fk_user_ongoing_tasks_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_ongoing_tasks
    ADD CONSTRAINT fk_user_ongoing_tasks_user_id FOREIGN KEY (user_id) REFERENCES public.user_model(id);

 --
-- Name: user_ongoing_tasks fk_user_ongoing_tasks_task_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_ongoing_tasks
    ADD CONSTRAINT fk_user_ongoing_tasks_task_id FOREIGN KEY (task_id) REFERENCES public.quest_task(id);


 --
-- Name: user_ongoing_quests fk_user_ongoing_quests_quest_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_ongoing_quests
    ADD CONSTRAINT fk_user_ongoing_quests_quest_id FOREIGN KEY (quest_id) REFERENCES public.quest_model(id);

 --
-- Name: user_ongoing_quests fk_user_ongoing_quests_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_ongoing_quests
    ADD CONSTRAINT fk_user_ongoing_quests_user_id FOREIGN KEY (user_id) REFERENCES public.user_model(id);




--
-- Name: user_completed_quests fk1tmc8w597s486q0rn0nuy486v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_completed_quests
    ADD CONSTRAINT fk1tmc8w597s486q0rn0nuy486v FOREIGN KEY (quest_id) REFERENCES public.quest_model(id);


--
-- Name: user_completed_quests fkgdxg3elfjrp3gk2gvci1ul1xu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_completed_quests
    ADD CONSTRAINT fkgdxg3elfjrp3gk2gvci1ul1xu FOREIGN KEY (user_id) REFERENCES public.user_model(id);


--
-- Name: quest_model fkmu22dmk8j854tfvy30426dyql; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_model
    ADD CONSTRAINT fkmu22dmk8j854tfvy30426dyql FOREIGN KEY (owner_id) REFERENCES public.user_model(id);


--
-- Name: quest_task fkref8ktwin6pqynmgdyoyhvc0v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quest_task
    ADD CONSTRAINT fkref8ktwin6pqynmgdyoyhvc0v FOREIGN KEY (quest_id) REFERENCES public.quest_model(id);


--
-- PostgreSQL database dump complete
--

