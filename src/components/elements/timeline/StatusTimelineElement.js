
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { useEffect, useState } from 'react';
import * as database from '../../../database';
import { FireStoreConst, FinanceConst, AppTextConst } from '../../../constants/AppConstants';
import './timeline.scss';
import SpinnerLoader from '../../spinner-loader/SpinnerLoaderComponent';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';

import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';

const StatusTimelineElement = ({id}) =>{
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async() =>{ 
      let data = await database.loadByParamId(FireStoreConst.LOGS_CUSTOMER_DEALS, id);
      console.log(Object.entries(data).sort((a,b)=>b[1]-a[1]));
      setData(data);
      setLoading(false);
        })() 
  }, []);

  return (
    <div style={{minHeight: 380, width:'100%', minWidth: 340}}>
      { !loading &&
     <>
      <Timeline position="right">
      {data && Array.from(data).map((d, index) => (
      <TimelineItem key={index}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.primary"
        >
        {d.createdAt.toDate().toDateString()} {d.createdAt.toDate().toLocaleTimeString('en-US')}
       </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            {d.status === 'Open' &&  <PostAddIcon />}
            {d.status === 'Awaiting' &&  <PriceChangeOutlinedIcon  />}
            {d.status === 'Closed' && <BookmarkAddedOutlinedIcon/>}
            {d.status === 'Rejected' && <CancelPresentationOutlinedIcon/>}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <div className="timeline-heading">
            {d.status}
          </div>
          <div className="timeline-subheading">{d.type}</div>
          <div className="timeline-title">CUSTOMER: {d.customerName}</div>
        </TimelineContent>
      </TimelineItem>
      ))}
      
    </Timeline>
    </>
      }
    {loading && <SpinnerLoader  size={55} loading={loading}/>}
    </div>
  );
}
export default StatusTimelineElement;