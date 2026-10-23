import { useTranslation } from 'react-i18next'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { PageHero } from '@/components/PageHero'
import { mainSiteHref } from '@/lib/site'
import { CorporateSeriesPage } from '@/pages/corporate-series/CorporateSeriesPage'

function NotFound() {
  const { t } = useTranslation('common')
  return (
    <PageHero eyebrow={t('notFound.eyebrow')} title={t('notFound.title')} intro={t('notFound.description')}>
      <a className="mt-6 inline-flex font-bold text-white underline-offset-4 hover:underline" href={mainSiteHref('/')}>
        {t('notFound.backHome')}
      </a>
    </PageHero>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/corporate-series"
          element={
            <SiteLayout active="competitions">
              <CorporateSeriesPage />
            </SiteLayout>
          }
        />
        <Route path="/" element={<Navigate to="/corporate-series" replace />} />
        <Route
          path="*"
          element={
            <SiteLayout>
              <NotFound />
            </SiteLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
