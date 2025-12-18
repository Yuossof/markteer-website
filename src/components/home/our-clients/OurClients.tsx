import React from 'react'
import partnerImages from './partners'
import Image from 'next/image'
import './our-clients.css'

const OurClients = () => {
  const itemsPerRow = Math.ceil(partnerImages.length / 3)
  const row1 = partnerImages.slice(0, itemsPerRow)
  const row2 = partnerImages.slice(itemsPerRow, itemsPerRow * 2)
  const row3 = partnerImages.slice(itemsPerRow * 2)

  return (
    <section className="our-clients ">
      {/* <h2 className='text-5xl text-center mb-14 mt-11 font-semibold' >Our Clients</h2> */}

      <div className="marquee-container">
        <div className="marquee marquee-right">
          <div className="marquee-content">
            {[...row1, ...row1].map((src, idx) => (
              <Image
                key={`row1-${idx}`}
                src={src}
                alt={`partner-row1-${idx}`}
                width={76}
                height={35}
                style={{ objectFit: 'contain', margin: '0 20px' }}
              />
            ))}
          </div>
        </div>

        <div className="marquee marquee-left">
          <div className="marquee-content">
            {[...row2, ...row2].map((src, idx) => (
              <Image
                key={`row2-${idx}`}
                src={src}
                alt={`partner-row2-${idx}`}
                width={76}
                height={35}
                style={{ objectFit: 'contain', margin: '0 20px' }}
              />
            ))}
          </div>
        </div>

        <div className="marquee marquee-right">
          <div className="marquee-content">
            {[...row3, ...row3].map((src, idx) => (
              <Image
                key={`row3-${idx}`}
                src={src}
                alt={`partner-row3-${idx}`}
                width={76}
                height={35}
                style={{ objectFit: 'contain', margin: '0 20px' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurClients