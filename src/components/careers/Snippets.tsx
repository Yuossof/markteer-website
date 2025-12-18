import Image from 'next/image'
import React from 'react'
import styles from '../../app/careers/snippets.module.css'

const Snippets = ({snippets}: {snippets: {url: string}[]}) => {

  if (!snippets || snippets.length === 0) {
    return <div>No snippets available</div>
  }

  const itemsPerRow = Math.ceil(snippets.length / 2)
  const row1 = snippets.slice(0, itemsPerRow)
  const row2 = snippets.slice(itemsPerRow, itemsPerRow * 2)

  return (
    <div className="w-full overflow-hidden py-10 space-y-6">

      {/* Row 1 - Moving Right */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marqueeTrack} ${styles.animateRight}`}>
          {[...row1, ...row1, ...row1, ...row1].map((src, idx) => (
            <div key={`row1-${idx}`} className={styles.marqueeItem}>
              <Image
                src={src.url}
                alt={`culture-${idx}`}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moving Left */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marqueeTrack} ${styles.animateLeft}`}>
          {[...row2, ...row2, ...row2, ...row2].map((src, idx) => (
            <div key={`row2-${idx}`} className={styles.marqueeItem}>
              <Image
                src={src.url}
                alt={`culture-${idx}`}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Snippets