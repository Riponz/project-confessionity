import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentPost from './CommentPost';
import ShowComments from './ShowComments';
import DateRangeIcon from '@mui/icons-material/DateRange';


function Card({ username, content, time, comnts, id, delbtn, tags }) {

  const originalDate = new Date(time);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };

  const formattedDate = originalDate.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1$2');

  return (
    <>
      {/* {console.log(comnts, "comments format check from card")} */}
      <div key={id} className='w-[100%] h-max flex flex-col rounded-lg bg-white justify-center my-1 items-start p-4 '>
        <div className='w-full h-max flex flex-col justify-center items-start ml-1 pl-2'>
          <div className='font-bold sm:font-bold text-base sm:text-base lg:text-xl w-full'>{username ? username : <Skeleton height={40} />}</div>
          <div className='text-xs text-slate-600'>{time ? (<div className='flex justify-center items-start h-max rounded-full py-1 px-2 my-3 bg-[#e0dbfc]'><DateRangeIcon fontSize='small' /><div className='m-[.1rem]'>{formattedDate}</div></div>) : <div className='h-4'></div>}</div>
          <div className='mt-1 w-full whitespace-pre-wrap'><p >{content ? content : <Skeleton count={3} />}</p></div>
        </div>

        <div className='card flex ml-1 justify-center items-center mt-5'>
          
          {
            tags?.map(tag => {
              return (
                <div className='text-[#a394f8] mx-1.5 rounded-full'>
                  <span className='font-bold'>#</span>{tag}
                </div>
            )
            })
          }
        </div>
        {
          username ? (
            <ShowComments>
              <div className='pt-4 p-2 w-full'>
                <Accordion>

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <span className='text-[#b2a4ff] font-bold text-lg'>comments</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="comments overflow-y-scroll p-4 text-justify w-full h-max max-h-[16rem]">
                      <CommentPost pid={id} />
                      {
                        comnts?.length == 0 ? (<div className='w-full h-full flex justify-center items-center text-black text-xl font-bold my-4'>no comments yet</div>) : (comnts?.slice(0).reverse().map(comment => {
                          return (
                            <div className='w-full h-max p-5 rounded-lg shadow-xl my-2'>
                              {comment}
                            </div>
                          )
                        }))
                      }



                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </ShowComments>
          ) : (<div className='w-full'><Skeleton height={30} /></div>)
        }




      </div>
    </>
  )
}

export default Card