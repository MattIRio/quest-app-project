import React, { useEffect, useState } from 'react'
import QuestFilter from './QuestFilter';
import ContainerBlurBg from '../../UI/container/ContainerBlurBg';
import { Link } from 'react-router-dom';
import { questService } from '../../services/questService';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star'
import Loader from '../../UI/Loader/Loader';
export default function Rating() {

   const { data: quests, isLoading, isError } = questService.useGetQuestsQuery({ page: 1, size: 20, sort: 'name' });

   const [filteredQuests, setFilteredQuests] = useState([]);
   const [filters, setFilters] = useState({ search: '', rating: 'desc', tags: [] });
   useEffect(() => {
      if (quests) {
         setFilteredQuests(quests);
      }
   }, [quests]);

   const handleFilterChange = ({ search, rating, tags }) => {
      // Оновлення фільтрів
      setFilters({ search, rating, tags });
   };

   useEffect(() => {
      if (quests) {
         let filtered = quests.filter((quest) =>
            quest.name.toLowerCase().includes(filters.search.toLowerCase())
         );
         // if (filters.tags.length) {
         //    filtered = filtered.filter((quest) =>
         //       quest.tags.some((tag) => filters.tags.includes(tag))
         //    );
         // }
         filtered.sort((a, b) => (filters.rating === "asc" ? a.rating - b.rating : b.rating - a.rating));
         setFilteredQuests(filtered);
      }
   }, [quests, filters]);

   if (isLoading) {
      return (
         <Loader />
      );
   }

   return (
      <ContainerBlurBg>
         <div style={{ marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Рейтинг квестів</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <QuestFilter onFilterChange={handleFilterChange} />

               <div>
                  <ul style={{ padding: 0, listStyleType: 'none' }}>
                     {filteredQuests.map((quest, index) => (
                        <Link to={"/quests/" + quest.id} key={quest.id} >
                           <li style={{
                              backgroundColor: index & 1 ? 'rgba(255,255,255,0.3)' : 'transparent',
                              borderTop: index & 1 ? "1px solid #ddddd" : "none",
                              borderBottom: index & 1 ? "1px solid #ddddd" : "none",
                              cursor: 'pointer',
                              padding: '10px',
                           }}
                           >
                              <h3 style={{ margin: '0' }}>{quest.name}</h3>
                              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", flexWrap: "wrap" }}>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <QuestionAnswerIcon style={{ marginRight: '5px' }} />
                                    Кількість запитань: {quest.amountOfQuestions}
                                 </div>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <AccessTimeIcon style={{ marginRight: '5px' }} />
                                    {quest.timeLimit} сек.
                                 </div>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon style={{ marginRight: '5px', color: quest.rating ? 'gold' : 'gray' }} />
                                    Рейтинг: {quest.rating !== null ? quest.rating : '-'}
                                 </div>
                              </div>
                           </li>
                        </Link>

                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </ContainerBlurBg>
   )
}
