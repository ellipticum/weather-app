'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { Line } from '@ant-design/charts'
import { useData } from '@/features/Providers/DataProvider'
import styles from './styles.module.scss'
import Loading from '@/shared/UI/Loading'
import { IForecastResponse } from '@/widgets/Result/model/interfaces/forecastResponse'
import { Metric } from '@/widgets/Result/model/types/metric'
import { Granularity } from '@/widgets/Result/model/types/granularity'
import { getChartData } from '@/widgets/Result/model/helpers/getChartData'

const Result = () => {
    const { data, isLoading } = useData()
    const [forecasts, setForecasts] = useState<IForecastResponse[]>(data ? [data] : [])
    const [metricType, setMetricType] = useState<Metric>('temp')
    const [granularity, setGranularity] = useState<Granularity>('3h')

    useEffect(() => {
        if (data && !forecasts.find((f) => f.city.id === data.city.id)) {
            setForecasts((prev) => [...prev, data])
        }
    }, [data, forecasts])

    const handleMetricChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMetricType(e.target.value as Metric)
    }

    const handleGranularityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGranularity(e.target.value as Granularity)
    }

    const chartData = getChartData(forecasts, metricType, granularity)

    const config = {
        data: chartData,
        xField: 'time',
        yField: 'value',
        seriesField: 'city',
        smooth: true,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false
            }
        }
    }

    if (!data || !data.list.length) {
        return <div className={styles.notFound}>Ещё ничего нет</div>
    }

    return (
        <Loading isLoading={isLoading}>
            <div className={styles.result}>
                <div className={styles.controls}>
                    <label className={styles.label}>
                        <span className={styles.name}>тип данных:</span>
                        <select
                            className={styles.select}
                            value={metricType}
                            onChange={handleMetricChange}
                        >
                            <option value='temp'>температура</option>
                            <option value='pressure'>давление</option>
                            <option value='humidity'>влажность</option>
                            <option value='wind'>ветер</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        <span className={styles.name}>гранулярность:</span>
                        <select
                            className={styles.select}
                            value={granularity}
                            onChange={handleGranularityChange}
                        >
                            <option value='3h'>3 часа</option>
                            <option value='daily'>день</option>
                        </select>
                    </label>
                </div>
                <div className={styles.chart}>
                    <Line {...config} />
                </div>
            </div>
        </Loading>
    )
}

export default Result
